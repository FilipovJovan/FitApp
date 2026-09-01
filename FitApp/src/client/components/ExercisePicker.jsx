import { useEffect, useState } from 'react';
import * as exercisesApi from '../api/exercises.js';

export default function ExercisePicker({ onPick }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function run() {
            setLoading(true);
            try {
                const data = await exercisesApi.listExercises(query ? { search: query } : {});
                if (!cancelled) setResults(data || []);
            } catch {
                if (!cancelled) setResults([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        if (open) run();
        return () => { cancelled = true; };
    }, [query, open]);

    return (
        <div className="field" style={{ position: 'relative' }}>
            <label>Exercise</label>
            <input
                type="text"
                placeholder="Search the exercise catalog…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
            />
            {open && (
                <div className="picker-results" style={{ position: 'absolute', zIndex: 5, left: 0, right: 0 }}>
                    {loading && <div className="picker-row">Searching…</div>}
                    {!loading && results.length === 0 && <div className="picker-row">No matches</div>}
                    {!loading && results.map((ex) => (
                        <div
                            key={ex.id}
                            className="picker-row"
                            onMouseDown={() => {
                                onPick(ex);
                                setQuery(ex.name);
                                setOpen(false);
                            }}
                        >
                            <span>{ex.name}</span>
                            {ex.muscle_group && <span className="chip">{ex.muscle_group}</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
