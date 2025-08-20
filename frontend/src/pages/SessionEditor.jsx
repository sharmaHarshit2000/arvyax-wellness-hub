import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import useAuth from "../hooks/useAuth";
import debounce from "../utils/debounce";
import { Loader2 } from "lucide-react";

export default function SessionEditor() {
    const { id: routeId } = useParams();
    const navigate = useNavigate();
    const { showToast } = useAuth();

    const [form, setForm] = useState({ title: "", tags: "", json_file_url: "" });
    const [id, setId] = useState(routeId || null);
    const [saving, setSaving] = useState(false);
    const [savingLabel, setSavingLabel] = useState(false);
    const [jsonError, setJsonError] = useState("");

    const currentSaveRef = useRef(null);
    const loadedRef = useRef(false);

    useEffect(() => {
        if (id) {
            api.get(`/sessions/my-sessions/${id}`).then((res) => {
                setForm({
                    title: res.data.title || "",
                    tags: res.data.tags?.join(", ") || "",
                    json_file_url: res.data.json_file_url || "",
                });
                loadedRef.current = true;
            });
        } else {
            loadedRef.current = true;
        }
    }, [id]);

    const formRef = useRef(form);
    useEffect(() => {
        formRef.current = form;
    }, [form]);

    useEffect(() => {
        let timeout;
        if (saving) setSavingLabel(true);
        else timeout = setTimeout(() => setSavingLabel(false), 800);
        return () => clearTimeout(timeout);
    }, [saving]);

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const performSave = useCallback(
        async (silent = false) => {
            if (!loadedRef.current) return;
            if (!formRef.current.title.trim()) return;

            if (formRef.current.json_file_url && !isValidUrl(formRef.current.json_file_url)) {
                setJsonError("Invalid JSON URL");
                return;
            } else {
                setJsonError("");
            }

            try {
                setSaving(true);

                const savePromise = api.post("/sessions/my-sessions/save-draft", {
                    id,
                    ...formRef.current,
                    tags: formRef.current.tags
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                });

                currentSaveRef.current = savePromise;
                const res = await savePromise;

                if (!id) {
                    setId(res.data._id);
                    navigate(`/editor/${res.data._id}`, { replace: true });
                }

                if (!silent) showToast("Draft saved", "success");
            } catch {
                showToast("Save failed", "error");
            } finally {
                setSaving(false);
                currentSaveRef.current = null;
            }
        },
        [id, navigate, showToast]
    );

    const saveDraft = useRef(debounce(() => performSave(true), 1500)).current;

    const publish = async () => {
        if (!form.title.trim()) {
            showToast("Title is required to publish", "error");
            return;
        }
        if (!form.json_file_url.trim()) {
            showToast("JSON File URL is required to publish", "error");
            return;
        }
        if (!isValidUrl(form.json_file_url)) {
            showToast("Invalid JSON File URL", "error");
            return;
        }

        try {
            if (currentSaveRef.current) {
                showToast("Please wait, saving draft...", "warning");
                await currentSaveRef.current.catch(() => { });
            } else {
                await performSave(true);
            }

            if (!id) {
                showToast("Save draft before publishing", "error");
                return;
            }

            await api.post("/sessions/my-sessions/publish", { id });
            showToast("Session published", "success");
            navigate("/my-sessions");
        } catch {
            showToast("Publish failed", "error");
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                    {id ? "Edit Session" : "New Session"}
                </h2>

                {/* Title */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">Title</label>
                    <input
                        type="text"
                        placeholder="Session title"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
                        value={form.title}
                        onChange={(e) => {
                            setForm({ ...form, title: e.target.value });
                            saveDraft();
                        }}
                    />
                </div>

                {/* Tags */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">Tags (comma separated)</label>
                    <input
                        type="text"
                        placeholder="e.g. javascript, react, api"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
                        value={form.tags}
                        onChange={(e) => {
                            setForm({ ...form, tags: e.target.value });
                            saveDraft();
                        }}
                    />
                </div>

                {/* JSON File URL */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">JSON File URL</label>
                    <input
                        type="text"
                        placeholder="e.g. https://example.com/session.json"
                        className={`border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition ${jsonError ? "border-red-500" : "border-gray-300"
                            }`}
                        value={form.json_file_url}
                        onChange={(e) => {
                            setForm({ ...form, json_file_url: e.target.value });
                            saveDraft();
                            if (e.target.value && !isValidUrl(e.target.value)) setJsonError("Invalid JSON URL");
                            else setJsonError("");
                        }}
                    />
                    {jsonError && <p className="text-red-500 text-xs mt-1">{jsonError}</p>}
                </div>

                {/* Publish Button */}
                <button
                    onClick={publish}
                    disabled={saving}
                    className={`w-full py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-colors ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                        }`}
                >
                    {savingLabel ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5" />
                            <span>Saving draft…</span>
                        </>
                    ) : (
                        <span>Publish</span>
                    )}
                </button>
            </div>
        </div>
    );
}
