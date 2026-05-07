import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import defaultEssays from "../data/essays";

// ── Auth ────────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "enricj2026";

export function useAuth() {
  const [authed, setAuthed] = useState(() => {
    return sessionStorage.getItem("enricj_admin") === "true";
  });

  function login(password) {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("enricj_admin", "true");
      setAuthed(true);
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem("enricj_admin");
    setAuthed(false);
  }

  return { authed, login, logout };
}

// ── Essays ──────────────────────────────────────────────────────────────────
export function useEssays() {
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEssays = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("essays")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      setEssays(defaultEssays);
    } else {
      setEssays(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchEssays(); }, [fetchEssays]);

  async function addEssay(essay) {
    const slug = slugify(essay.title);
    const { data, error } = await supabase
      .from("essays")
      .insert([{ ...essay, slug }])
      .select()
      .single();
    if (!error && data) setEssays((prev) => [data, ...prev]);
    return { data, error };
  }

  async function updateEssay(id, updates) {
    const slug = slugify(updates.title || "");
    const { data, error } = await supabase
      .from("essays")
      .update({ ...updates, slug })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) setEssays((prev) => prev.map((e) => e.id === id ? data : e));
    return { data, error };
  }

  async function deleteEssay(id) {
    const { error } = await supabase.from("essays").delete().eq("id", id);
    if (!error) setEssays((prev) => prev.filter((e) => e.id !== id));
    return { error };
  }

  return { essays, loading, addEssay, updateEssay, deleteEssay, refetch: fetchEssays };
}

// ── Publications ────────────────────────────────────────────────────────────
export function usePublications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPublications = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setPublications(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPublications(); }, [fetchPublications]);

  async function addPublication(pub) {
    const { data, error } = await supabase
      .from("publications")
      .insert([pub])
      .select()
      .single();
    if (!error && data) setPublications((prev) => [data, ...prev]);
    return { data, error };
  }

  async function updatePublication(id, updates) {
    const { data, error } = await supabase
      .from("publications")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (!error && data) setPublications((prev) => prev.map((p) => p.id === id ? data : p));
    return { data, error };
  }

  async function deletePublication(id) {
    const { error } = await supabase.from("publications").delete().eq("id", id);
    if (!error) setPublications((prev) => prev.filter((p) => p.id !== id));
    return { error };
  }

  return { publications, loading, addPublication, updatePublication, deletePublication };
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}
