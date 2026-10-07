import React, { useState, useEffect, useMemo } from 'react';

const Icons = {
  Trophy: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  Users: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Play: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3l14 9-14 9V3z"/>
    </svg>
  ),
  Settings: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Plus: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Trash2: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  ),
  RotateCcw: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
    </svg>
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  User: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
};

// Custom Hook für localStorage
function useStickyState(defaultValue: any, key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const DEFAULT_TEAMS = [
  { id: 't1', name: '26er', p1: 'Spieler 1', p2: 'Spieler 2' },
  { id: 't2', name: 'Martial Darts', p1: 'Spieler 3', p2: 'Spieler 4' },
  { id: 't3', name: 'The Darts Knights', p1: 'Spieler 5', p2: 'Spieler 6' },
  { id: 't4', name: 'The Lucky Two', p1: 'Spieler 7', p2: 'Spieler 8' },
];

export default function App() {
  const [tournamentName, setTournamentName] = useStickyState('Elmenhorster Darts Open', 'darts_name_light');
  const [teams, setTeams] = useStickyState(DEFAULT_TEAMS, 'darts_teams_light');
  const [status, setStatus] = useStickyState('SETUP', 'darts_status_light'); // 'SETUP' or 'LIVE'
  
  const [leagueMatches, setLeagueMatches] = useStickyState([], 'darts_league_matches_light');
  const [koMatches, setKoMatches] = useStickyState({
    sf: { scoreA: '', scoreB: '' },
    final: { scoreA: '', scoreB: '' }
  }, 'darts_ko_matches_light');

  // Modal State for resetting
  const [showResetModal, setShowResetModal] = useState(false);

  const addTeam = () => {
    setTeams([...teams, { id: `t${Date.now()}`, name: `Team ${teams.length + 1}`, p1: '', p2: '' }]);
  };

  const removeTeam = (id: string) => {
    setTeams(teams.filter((t: any) => t.id !== id));
  };

  const updateTeam = (id: string, field: string, value: string) => {
    setTeams(teams.map((t: any) => t.id === id ? { ...t, [field]: value } : t));
  };

  const startTournament = () => {
    let matches = [];
    let matchId = 1;
    // Round Robin (Jeder gegen Jeden)
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          id: `m${matchId++}`,
          teamAId: teams[i].id,
          teamBId: teams[j].id,
          scoreA: '',
          scoreB: ''
        });
      }
    }
    setLeagueMatches(matches);
    setKoMatches({
      sf: { scoreA: '', scoreB: '' },
      final: { scoreA: '', scoreB: '' }
    });
    setStatus('LIVE');
  };

  const confirmReset = () => {
    setStatus('SETUP');
    setShowResetModal(false);
  };

  const table = useMemo(() => {
    let stats: any = {};
    teams.forEach((t: any) => {
      stats[t.id] = { ...t, played: 0, legsFor: 0, legsAgainst: 0, legDiff: 0 };
    });

    leagueMatches.forEach((m: any) => {
      if (m.scoreA !== '' && m.scoreB !== '') {
        const sA = parseInt(m.scoreA) || 0;
        const sB = parseInt(m.scoreB) || 0;
        
        if (stats[m.teamAId] && stats[m.teamBId]) {
            stats[m.teamAId].played += 1;
            stats[m.teamBId].played += 1;
            stats[m.teamAId].legsFor += sA;
            stats[m.teamAId].legsAgainst += sB;
            stats[m.teamBId].legsFor += sB;
            stats[m.teamBId].legsAgainst += sA;
        }
      }
    });

    // Leg Differenz berechnen
    let sortedTable = Object.values(stats).map((s: any) => {
      s.legDiff = s.legsFor - s.legsAgainst;
      return s;
    });

    // Sortierung: NUR nach Leg-Differenz, dann geworfene Legs
    sortedTable.sort((a: any, b: any) => {
      if (b.legDiff !== a.legDiff) return b.legDiff - a.legDiff;
      return b.legsFor - a.legsFor;
    });

    return sortedTable;
  }, [teams, leagueMatches]);

  const updateLeagueScore = (id: string, field: string, value: string) => {
    setLeagueMatches((matches: any) => 
      matches.map((m: any) => m.id === id ? { ...m, [field]: value } : m)
    );
  };

  const updateKoScore = (matchKey: string, field: string, value: string) => {
    setKoMatches((prev: any) => ({
      ...prev,
      [matchKey]: { ...prev[matchKey], [field]: value }
    }));
  };

  const getWinner = (match: any, teamA: any, teamB: any) => {
    if (!teamA || !teamB || match.scoreA === '' || match.scoreB === '') return null;
    const sA = parseInt(match.scoreA) || 0;
    const sB = parseInt(match.scoreB) || 0;
    if (sA > sB) return teamA;
    if (sB > sA) return teamB;
    return null; // Bei unentschieden noch kein Sieger
  };

  if (status === 'SETUP') {
    const isStartDisabled = teams.length < 3;

    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-4">
            <Icons.Trophy className="w-20 h-20 mx-auto text-blue-600 mb-4" />
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Darts Turnier Manager</h1>
            <p className="text-slate-500 text-lg">Konfiguriere dein Turnier im hellen Design</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50 space-y-8">
            
            {/* Tournament Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Icons.Settings className="w-4 h-4" /> Turniername
              </label>
              <input 
                type="text" 
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-lg font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Teams */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Icons.Users className="w-4 h-4" /> Teams & Spieler ({teams.length})
              </label>
              <div className="space-y-3">
                {teams.map((team: any, idx: number) => (
                  <div key={team.id} className="flex flex-col md:flex-row gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 md:w-1/3">
                        <div className="flex-none w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                        </div>
                        <input 
                        type="text" 
                        value={team.name}
                        onChange={(e) => updateTeam(team.id, 'name', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors font-semibold"
                        placeholder="Team Name"
                        />
                    </div>
                    <div className="flex items-center gap-2 md:w-1/3">
                        <Icons.User className="w-4 h-4 text-slate-400 flex-none" />
                        <input 
                        type="text" 
                        value={team.p1}
                        onChange={(e) => updateTeam(team.id, 'p1', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Spieler 1"
                        />
                    </div>
                    <div className="flex items-center gap-2 md:w-1/3 relative pr-10">
                        <Icons.User className="w-4 h-4 text-slate-400 flex-none" />
                        <input 
                        type="text" 
                        value={team.p2}
                        onChange={(e) => updateTeam(team.id, 'p2', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Spieler 2"
                        />
                        <button 
                            onClick={() => removeTeam(team.id)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                            title="Team entfernen"
                        >
                            <Icons.Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={addTeam}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100"
              >
                <Icons.Plus className="w-4 h-4" /> Weiteres Team hinzufügen
              </button>
            </div>

            {/* Start Button */}
            <div className="pt-6 border-t border-slate-100">
              <button 
                onClick={startTournament}
                disabled={isStartDisabled}
                className={`w-full flex items-center justify-center gap-3 font-bold text-xl py-4 rounded-xl shadow-lg transition-all 
                  ${isStartDisabled 
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 active:scale-[0.99]'}`}
              >
                <Icons.Play className="w-6 h-6 fill-current" />
                {isStartDisabled ? 'Mindestens 3 Teams benötigt' : 'Turnier starten'}
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Icons.Trophy className="text-blue-600 w-8 h-8" />
            {tournamentName}
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Wertung: Jedes Leg zählt (Keine Siegpunkte)</p>
        </div>
        <button 
          onClick={() => setShowResetModal(true)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors font-semibold"
        >
          <Icons.RotateCcw className="w-4 h-4" /> Setup & Reset
        </button>
      </header>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Turnier zurücksetzen?</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Bist du sicher? Alle bisherigen Spielergebnisse und der gesamte Turnierfortschritt gehen unwiderruflich verloren.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowResetModal(false)} 
                className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold rounded-lg transition-colors"
              >
                Abbrechen
              </button>
              <button 
                onClick={confirmReset} 
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-colors"
              >
                Ja, zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* AREA A: Spielplan */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-4">
             Spielplan (Vorrunde)
          </h2>
          <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
            {leagueMatches.map((match: any, i: number) => {
              const teamA = teams.find((t: any) => t.id === match.teamAId);
              const teamB = teams.find((t: any) => t.id === match.teamBId);
              return (
                <div key={match.id} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider text-center">
                    Spiel {i + 1}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 text-right">
                        <div className="font-bold text-slate-900 truncate">{teamA?.name}</div>
                        <div className="text-xs text-slate-500 truncate">{teamA?.p1} & {teamA?.p2}</div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                      <input 
                        type="number" min="0" 
                        value={match.scoreA} onChange={(e) => updateLeagueScore(match.id, 'scoreA', e.target.value)}
                        className="w-12 h-10 bg-white border border-slate-300 rounded text-center text-lg font-extrabold text-blue-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <span className="text-slate-400 font-bold">:</span>
                      <input 
                        type="number" min="0" 
                        value={match.scoreB} onChange={(e) => updateLeagueScore(match.id, 'scoreB', e.target.value)}
                        className="w-12 h-10 bg-white border border-slate-300 rounded text-center text-lg font-extrabold text-blue-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex-1 text-left">
                        <div className="font-bold text-slate-900 truncate">{teamB?.name}</div>
                        <div className="text-xs text-slate-500 truncate">{teamB?.p1} & {teamB?.p2}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AREA B: Live Tabelle & Bracket */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Tabelle */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-extrabold text-slate-900">
                Live-Tabelle
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="p-4 font-bold w-16 text-center">Platz</th>
                    <th className="p-4 font-bold">Team</th>
                    <th className="p-4 font-bold text-center">Spiele</th>
                    <th className="p-4 font-bold text-center">Legs</th>
                    <th className="p-4 font-bold text-center text-blue-600">Differenz</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {table.map((team: any, idx: number) => (
                    <tr key={team.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold text-sm
                          ${idx === 0 ? 'bg-amber-100 text-amber-700' : 
                            idx === 1 || idx === 2 ? 'bg-slate-100 text-slate-600' : 
                            'bg-transparent text-slate-400'}`}>
                          {idx + 1}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{team.name}</div>
                        <div className="text-xs text-slate-500">{team.p1} & {team.p2}</div>
                      </td>
                      <td className="p-4 text-center font-medium text-slate-700">{team.played}</td>
                      <td className="p-4 text-center font-medium text-slate-700">{team.legsFor} : {team.legsAgainst}</td>
                      <td className="p-4 text-center font-extrabold text-blue-600 text-lg">
                        {team.legDiff > 0 ? `+${team.legDiff}` : team.legDiff}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Turnierbaum (Elmenhorster Regel) */}
          {table.length >= 3 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
              <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                 Turnierbaum (Elmenhorster Regel)
              </h2>
              <div className="min-w-[500px] flex justify-between gap-8 items-center">
                
                {/* Halbfinale (Platz 2 vs Platz 3) */}
                <div className="flex-1">
                  <h3 className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center mb-3">
                    Halbfinale (2. vs 3.)
                  </h3>
                  <MatchCard 
                    teamA={table[1]} teamB={table[2]} 
                    matchData={koMatches.sf} matchKey="sf" 
                    updateScore={updateKoScore} 
                  />
                </div>

                {/* Connector */}
                <div className="flex flex-col justify-center items-center px-2 mt-6">
                  <Icons.ChevronRight className="w-8 h-8 text-slate-300" />
                </div>

                {/* Finale (Platz 1 vs Sieger HF) */}
                <div className="flex-1">
                   <h3 className="text-xs text-amber-500 font-bold uppercase tracking-widest text-center mb-3">
                    Finale
                   </h3>
                   <MatchCard 
                      teamA={table[0]} 
                      teamB={getWinner(koMatches.sf, table[1], table[2]) || { name: 'Sieger HF' }}
                      matchData={koMatches.final} matchKey="final" 
                      updateScore={updateKoScore}
                      isFinal={true}
                   />
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
      
      {/* Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
      `}} />
    </div>
  );
}

function MatchCard({ teamA, teamB, matchData, matchKey, updateScore, isFinal }: any) {
  return (
    <div className={`bg-white border-2 ${isFinal ? 'border-amber-200 shadow-amber-100/50' : 'border-slate-200'} rounded-xl p-4 shadow-sm relative`}>
      <div className="space-y-3">
        {/* Team A */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className={`font-bold truncate ${teamA?.id ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                {teamA?.name || 'TBD'}
            </div>
          </div>
          <input 
            type="number" min="0" 
            disabled={!teamA?.id}
            value={matchData.scoreA} 
            onChange={(e) => updateScore(matchKey, 'scoreA', e.target.value)}
            className="w-12 h-10 bg-slate-50 border border-slate-300 rounded-lg text-center text-base font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>
        
        <div className="h-px w-full bg-slate-100"></div>
        
        {/* Team B */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
             <div className={`font-bold truncate ${teamB?.id ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                {teamB?.name || 'TBD'}
            </div>
          </div>
          <input 
            type="number" min="0" 
            disabled={!teamB?.id}
            value={matchData.scoreB} 
            onChange={(e) => updateScore(matchKey, 'scoreB', e.target.value)}
            className="w-12 h-10 bg-slate-50 border border-slate-300 rounded-lg text-center text-base font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}