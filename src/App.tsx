import React, { useState, useEffect, useMemo } from 'react';

const Icons = {
  Trophy: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
  ),
  Users: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  User: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Play: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
  ),
  Settings: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
  Plus: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  Trash2: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  RotateCcw: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
  ),
  Target: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  Swords: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M14.5 6.5L18 3h3v3l-3.5 3.5"/><path d="M10 14.5l-4 4"/><path d="M5 19l-2 2"/><path d="M3 21l2-2"/><path d="M7 17l-4-4"/></svg>
  ),
  Info: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  )
};

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
  { id: 't1', name: '26er', p1: 'Spieler 1', p2: 'Spieler 2', group: 'A' },
  { id: 't2', name: 'Martial Darts', p1: 'Spieler 3', p2: 'Spieler 4', group: 'A' },
  { id: 't3', name: 'The Darts Knights', p1: 'Spieler 5', p2: 'Spieler 6', group: 'A' },
  { id: 't4', name: 'The Lucky Two', p1: 'Spieler 7', p2: 'Spieler 8', group: 'A' },
];

export default function App() {
  const [tournamentName, setTournamentName] = useStickyState('Elmenhorster Darts Open', 'darts_name_v3');
  const [additionalInfo, setAdditionalInfo] = useStickyState('501 Double Out, Einsatz 5€', 'darts_info_v3'); // New field
  const [status, setStatus] = useStickyState('SETUP', 'darts_status_v3');
  
  const [tourneyType, setTourneyType] = useStickyState('team', 'darts_type_v3');
  const [boardCount, setBoardCount] = useStickyState(1, 'darts_boards_v3');
  const [tournamentMode, setTournamentMode] = useStickyState('1_gruppe_elmenhorst', 'darts_mode_v3'); 

  const [participants, setParticipants] = useStickyState(DEFAULT_TEAMS, 'darts_participants_v3');
  
  const [leagueMatches, setLeagueMatches] = useStickyState([], 'darts_league_matches_v3');
  const [koMatches, setKoMatches] = useStickyState({
    sf1: { scoreA: '', scoreB: '' },
    sf2: { scoreA: '', scoreB: '' },
    final: { scoreA: '', scoreB: '' }
  }, 'darts_ko_matches_v3');

  const [showResetModal, setShowResetModal] = useState(false);

  const addParticipant = () => {
    setParticipants([...participants, { 
      id: `p${Date.now()}`, 
      name: `${tourneyType === 'single' ? 'Spieler' : 'Team'} ${participants.length + 1}`, 
      p1: '', p2: '', group: 'A' 
    }]);
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter((p: any) => p.id !== id));
  };

  const updateParticipant = (id: string, field: string, value: string) => {
    setParticipants(participants.map((p: any) => p.id === id ? { ...p, [field]: value } : p));
  };

  const startTournament = () => {
    let updatedParticipants = [...participants];
    
    if (tournamentMode === '2_gruppen_kreuz') {
        updatedParticipants = updatedParticipants.map((p, index) => ({
            ...p, group: index % 2 === 0 ? 'A' : 'B'
        }));
    } else {
        updatedParticipants = updatedParticipants.map(p => ({ ...p, group: 'A' }));
    }
    setParticipants(updatedParticipants);

    let matches: any[] = [];
    let matchIdCounter = 1;

    const generateRoundRobin = (groupFilter: string) => {
        const groupParticipants = updatedParticipants.filter(p => p.group === groupFilter);
        let groupMatches = [];
        for (let i = 0; i < groupParticipants.length; i++) {
            for (let j = i + 1; j < groupParticipants.length; j++) {
                groupMatches.push({
                    id: `m${matchIdCounter++}`,
                    teamAId: groupParticipants[i].id,
                    teamBId: groupParticipants[j].id,
                    scoreA: '', scoreB: '', group: groupFilter
                });
            }
        }
        return groupMatches;
    };

    if (tournamentMode === '2_gruppen_kreuz') {
        const matchesA = generateRoundRobin('A');
        const matchesB = generateRoundRobin('B');
        const maxLength = Math.max(matchesA.length, matchesB.length);
        for(let i=0; i<maxLength; i++){
            if(matchesA[i]) matches.push(matchesA[i]);
            if(matchesB[i]) matches.push(matchesB[i]);
        }
    } else {
        matches = generateRoundRobin('A');
    }

    matches = matches.map((m, idx) => ({
        ...m,
        board: boardCount === 2 ? (idx % 2 === 0 ? 1 : 2) : 1
    }));

    setLeagueMatches(matches);
    setKoMatches({
      sf1: { scoreA: '', scoreB: '' },
      sf2: { scoreA: '', scoreB: '' },
      final: { scoreA: '', scoreB: '' }
    });
    setStatus('LIVE');
  };

  const confirmReset = () => {
    setStatus('SETUP');
    setShowResetModal(false);
  };

  const calculateTable = (groupFilter: string) => {
    let stats: any = {};
    const groupParticipants = participants.filter((p: any) => p.group === groupFilter);
    
    groupParticipants.forEach((p: any) => {
      stats[p.id] = { ...p, played: 0, legsFor: 0, legsAgainst: 0, legDiff: 0 };
    });

    leagueMatches.filter((m: any) => m.group === groupFilter).forEach((m: any) => {
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

    let sortedTable = Object.values(stats).map((s: any) => {
      s.legDiff = s.legsFor - s.legsAgainst;
      return s;
    });

    sortedTable.sort((a: any, b: any) => {
      if (b.legDiff !== a.legDiff) return b.legDiff - a.legDiff;
      return b.legsFor - a.legsFor;
    });

    return sortedTable;
  };

  const tableA = useMemo(() => calculateTable('A'), [participants, leagueMatches]);
  const tableB = useMemo(() => calculateTable('B'), [participants, leagueMatches]);

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
    return null;
  };

  if (status === 'SETUP') {
    let minPlayers = 3;
    if(tournamentMode === '1_gruppe_top4') minPlayers = 4;
    if(tournamentMode === '2_gruppen_kreuz') minPlayers = 4;

    const isStartDisabled = participants.length < minPlayers;

    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <Icons.Trophy className="w-16 h-16 mx-auto text-blue-600 mb-2" />
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Darts Turnier Manager</h1>
            <p className="text-slate-500 text-sm">Konfiguriere dein Turnier für den TV-Screen</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* COLUMN 1: Settings */}
            <div className="lg:col-span-1 space-y-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                        <Icons.Settings className="w-4 h-4" /> Einstellungen
                    </h2>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Turniername</label>
                        <input type="text" value={tournamentName} onChange={(e) => setTournamentName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Zusatzinfos / Regeln</label>
                        <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows={2}
                            placeholder="z.B. 501 Double Out, Best of 3..."
                            className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Turnierart</label>
                        <select value={tourneyType} onChange={(e) => setTourneyType(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                        >
                            <option value="single">Einzelspieler</option>
                            <option value="team">Teams (2er)</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Anzahl Dartboards</label>
                        <select value={boardCount} onChange={(e) => setBoardCount(Number(e.target.value))}
                            className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                        >
                            <option value={1}>1 Board</option>
                            <option value={2}>2 Boards (Parallel)</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Turniermodus</label>
                        <select value={tournamentMode} onChange={(e) => setTournamentMode(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                        >
                            <option value="1_gruppe_elmenhorst">1 Gruppe + Elmenhorster Regel (Pl 1 im Finale)</option>
                            <option value="1_gruppe_top4">1 Gruppe + Halbfinale (Top 4)</option>
                            <option value="2_gruppen_kreuz">2 Gruppen + Halbfinale</option>
                        </select>
                    </div>
                </div>
                <button 
                    onClick={startTournament} disabled={isStartDisabled}
                    className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl shadow-md transition-all 
                    ${isStartDisabled ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.99]'}`}
                >
                    <Icons.Play className="w-5 h-5 fill-current" />
                    {isStartDisabled ? `Min. ${minPlayers} Teilnehmer` : 'Turnier starten'}
                </button>
            </div>

            {/* COLUMN 2: Participants */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <Icons.Users className="w-4 h-4" /> Teilnehmer ({participants.length})
              </label>
              <div className="space-y-2">
                {participants.map((p: any, idx: number) => (
                  <div key={p.id} className="flex flex-col md:flex-row gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 relative pr-10">
                    <div className="flex items-center gap-2 md:w-1/3">
                        <div className="flex-none w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs">
                            {idx + 1}
                        </div>
                        <input type="text" value={p.name} onChange={(e) => updateParticipant(p.id, 'name', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 font-semibold"
                            placeholder={tourneyType === 'single' ? "Spielername" : "Team Name"}
                        />
                    </div>
                    {tourneyType === 'team' && (
                        <>
                        <div className="flex items-center gap-1 md:w-1/3">
                            <Icons.User className="w-3 h-3 text-slate-400 flex-none" />
                            <input type="text" value={p.p1} onChange={(e) => updateParticipant(p.id, 'p1', e.target.value)}
                                className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                                placeholder="Spieler 1" />
                        </div>
                        <div className="flex items-center gap-1 md:w-1/3">
                            <Icons.User className="w-3 h-3 text-slate-400 flex-none" />
                            <input type="text" value={p.p2} onChange={(e) => updateParticipant(p.id, 'p2', e.target.value)}
                                className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                                placeholder="Spieler 2" />
                        </div>
                        </>
                    )}
                    <button onClick={() => removeParticipant(p.id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-rose-500 hover:bg-rose-100 rounded transition-colors"
                    >
                        <Icons.Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addParticipant}
                className="mt-4 flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold text-sm px-3 py-1.5 rounded transition-colors"
              >
                <Icons.Plus className="w-4 h-4" /> Hinzufügen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTable = (groupTable: any[], title: string, showGroupBadge: boolean = false) => {
    
    // Logic for coloring rows green (advancing) or red (eliminated)
    const getRowBgColor = (idx: number) => {
        if (tournamentMode === '1_gruppe_elmenhorst') {
            return idx < 3 ? 'bg-green-50' : 'bg-red-50'; // Top 3 advance
        }
        if (tournamentMode === '1_gruppe_top4') {
            return idx < 4 ? 'bg-green-50' : 'bg-red-50'; // Top 4 advance
        }
        if (tournamentMode === '2_gruppen_kreuz') {
            return idx < 2 ? 'bg-green-50' : 'bg-red-50'; // Top 2 from each group advance
        }
        return 'bg-white';
    };

    return (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col h-full">
            <div className="px-2 py-1.5 border-b border-slate-200 bg-slate-100 flex justify-between items-center shrink-0">
                <h2 className="text-sm font-extrabold text-slate-800">{title}</h2>
                {showGroupBadge && <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-1.5 py-0.5 rounded">Grp {title.slice(-1)}</span>}
            </div>
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white border-b border-slate-200 text-slate-500 text-[10px] uppercase tracking-wider">
                    <th className="px-1 py-1 font-bold text-center w-8">Pl</th>
                    <th className="px-1 py-1 font-bold">{tourneyType === 'single' ? 'Spieler' : 'Team'}</th>
                    <th className="px-1 py-1 font-bold text-center">Sp</th>
                    <th className="px-1 py-1 font-bold text-center">Legs</th>
                    <th className="px-1 py-1 font-bold text-center text-blue-600">Diff</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                    {groupTable.map((team: any, idx: number) => (
                    <tr key={team.id} className={`${getRowBgColor(idx)} transition-colors`}>
                        <td className="px-1 py-1">
                        <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center font-bold text-[10px]
                            ${idx === 0 ? 'bg-amber-100 text-amber-700' : 
                            idx === 1 ? 'bg-slate-200 text-slate-700' : 
                            idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-transparent text-slate-500'}`}>
                            {idx + 1}
                        </div>
                        </td>
                        <td className="px-1 py-1 truncate max-w-[100px]">
                        <div className="font-bold text-slate-900 truncate">{team.name}</div>
                        {tourneyType === 'team' && <div className="text-[9px] text-slate-500 truncate">{team.p1} & {team.p2}</div>}
                        </td>
                        <td className="px-1 py-1 text-center font-medium text-slate-700">{team.played}</td>
                        <td className="px-1 py-1 text-center font-medium text-slate-700 whitespace-nowrap">{team.legsFor}:{team.legsAgainst}</td>
                        <td className="px-1 py-1 text-center font-extrabold text-blue-600">
                        {team.legDiff > 0 ? `+${team.legDiff}` : team.legDiff}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
  };

  return (
    // NO SCROLL on main container for TV layout
    <div className="h-screen w-full bg-slate-200 text-slate-800 font-sans p-2 flex flex-col overflow-hidden">
      
      {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-5 rounded-xl max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Turnier zurücksetzen?</h3>
            <p className="text-sm text-slate-500 mb-5">Alle bisherigen Spielergebnisse gehen verloren.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowResetModal(false)} className="px-3 py-1.5 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold rounded transition-colors">Abbrechen</button>
              <button onClick={confirmReset} className="px-3 py-1.5 text-sm bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded transition-colors">Ja, Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* Header - Compact */}
      <header className="shrink-0 flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-300 shadow-sm mb-2 gap-4">
        <div className="flex items-center gap-3">
          <Icons.Trophy className="text-blue-600 w-6 h-6 flex-none" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-slate-900 leading-tight">{tournamentName}</h1>
            {additionalInfo && (
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                <Icons.Info className="w-3 h-3" /> {additionalInfo}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
            <div className="hidden sm:flex gap-1 mr-2">
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200">
                    {tourneyType === 'single' ? 'Einzel' : 'Teams'}
                </span>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200">
                    {boardCount} Board(s)
                </span>
            </div>
            <button onClick={() => setShowResetModal(true)}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-900 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-semibold transition-colors"
            >
                <Icons.RotateCcw className="w-3 h-3" /> Setup
            </button>
        </div>
      </header>

      {/* MAIN GRID - 3 Columns ensuring it fits the screen */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-2">
        
        {/* COLUMN 1: Matches (Scrollable if needed) */}
        <div className="flex flex-col h-full overflow-hidden bg-slate-100 rounded-lg p-1 border border-slate-300">
          <h2 className="text-xs font-extrabold text-slate-800 p-1 mb-1 shrink-0 flex items-center gap-1">
             <Icons.Target className="w-3 h-3" /> Spielplan (Vorrunde)
          </h2>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 flex flex-col gap-1">
            {leagueMatches.map((match: any, i: number) => {
              const teamA = participants.find((t: any) => t.id === match.teamAId);
              const teamB = participants.find((t: any) => t.id === match.teamBId);
              // Alternating row colors for matches
              const bgClass = i % 2 === 0 ? 'bg-white' : 'bg-slate-50';

              return (
                <div key={match.id} className={`${bgClass} border border-slate-200 p-1.5 rounded flex flex-col gap-1 shadow-sm`}>
                  <div className="flex justify-between items-center px-1">
                     <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Spiel {i + 1}</span>
                     <div className="flex gap-1">
                        {tournamentMode === '2_gruppen_kreuz' && (
                            <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-600 px-1 rounded">Grp {match.group}</span>
                        )}
                        {boardCount === 2 && (
                            <span className="text-[9px] font-bold uppercase bg-blue-50 text-blue-600 px-1 rounded flex items-center gap-0.5">
                                Board {match.board}
                            </span>
                        )}
                     </div>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex-1 text-right truncate">
                        <div className="font-bold text-slate-800 text-xs truncate">{teamA?.name}</div>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0 px-1">
                      <input type="number" min="0" value={match.scoreA} onChange={(e) => updateLeagueScore(match.id, 'scoreA', e.target.value)}
                        className="w-8 h-6 bg-white border border-slate-300 rounded text-center text-xs font-bold text-blue-700 focus:outline-none focus:border-blue-500"
                      />
                      <span className="text-slate-400 font-bold text-xs">:</span>
                      <input type="number" min="0" value={match.scoreB} onChange={(e) => updateLeagueScore(match.id, 'scoreB', e.target.value)}
                        className="w-8 h-6 bg-white border border-slate-300 rounded text-center text-xs font-bold text-blue-700 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1 text-left truncate">
                        <div className="font-bold text-slate-800 text-xs truncate">{teamB?.name}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: Tables */}
        <div className="flex flex-col h-full overflow-hidden bg-slate-100 rounded-lg p-1 border border-slate-300 gap-1">
           {tournamentMode === '2_gruppen_kreuz' ? (
              <>
                  <div className="flex-1 overflow-hidden">{renderTable(tableA, 'Tabelle A', true)}</div>
                  <div className="flex-1 overflow-hidden">{renderTable(tableB, 'Tabelle B', true)}</div>
              </>
          ) : (
              <div className="flex-1 overflow-hidden">{renderTable(tableA, 'Live-Tabelle')}</div>
          )}
        </div>

        {/* COLUMN 3: Bracket */}
        <div className="flex flex-col h-full overflow-hidden bg-slate-100 rounded-lg p-1 border border-slate-300">
          <h2 className="text-xs font-extrabold text-slate-800 p-1 mb-1 shrink-0 flex items-center gap-1">
             <Icons.Swords className="w-3 h-3" /> K.O. Runde
          </h2>
          <div className="flex-1 bg-white border border-slate-200 rounded-lg p-2 overflow-hidden flex flex-col justify-around">
            
            {participants.length >= 3 && (
                <>
                {/* SEMI FINALS */}
                <div className="space-y-2">
                  
                  {tournamentMode === '1_gruppe_elmenhorst' && (
                     <div className="px-4">
                        <h3 className="text-[9px] text-slate-400 font-bold uppercase text-center mb-1">Halbfinale (2. vs 3.)</h3>
                        <MatchCard teamA={tableA[1]} teamB={tableA[2]} matchData={koMatches.sf2} matchKey="sf2" updateScore={updateKoScore} />
                     </div>
                  )}

                  {tournamentMode === '1_gruppe_top4' && (
                     <div className="flex gap-2">
                        <div className="flex-1">
                            <h3 className="text-[9px] text-slate-400 font-bold uppercase text-center mb-1">HF 1 (1. vs 4.)</h3>
                            <MatchCard teamA={tableA[0]} teamB={tableA[3]} matchData={koMatches.sf1} matchKey="sf1" updateScore={updateKoScore} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[9px] text-slate-400 font-bold uppercase text-center mb-1">HF 2 (2. vs 3.)</h3>
                            <MatchCard teamA={tableA[1]} teamB={tableA[2]} matchData={koMatches.sf2} matchKey="sf2" updateScore={updateKoScore} />
                        </div>
                     </div>
                  )}

                  {tournamentMode === '2_gruppen_kreuz' && (
                     <div className="flex gap-2">
                        <div className="flex-1">
                            <h3 className="text-[9px] text-slate-400 font-bold uppercase text-center mb-1">HF 1 (1A vs 2B)</h3>
                            <MatchCard teamA={tableA[0]} teamB={tableB[1]} matchData={koMatches.sf1} matchKey="sf1" updateScore={updateKoScore} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[9px] text-slate-400 font-bold uppercase text-center mb-1">HF 2 (1B vs 2A)</h3>
                            <MatchCard teamA={tableB[0]} teamB={tableA[1]} matchData={koMatches.sf2} matchKey="sf2" updateScore={updateKoScore} />
                        </div>
                     </div>
                  )}
                </div>

                <div className="flex justify-center shrink-0 my-1">
                  <Icons.ChevronRight className="w-5 h-5 text-slate-300 transform rotate-90" />
                </div>

                {/* FINAL */}
                <div className="px-4">
                   <h3 className="text-[10px] text-amber-500 font-bold uppercase text-center mb-1">Finale</h3>
                   
                   {tournamentMode === '1_gruppe_elmenhorst' && (
                       <MatchCard 
                          teamA={tableA[0]} 
                          teamB={getWinner(koMatches.sf2, tableA[1], tableA[2]) || { name: 'Sieger HF' }}
                          matchData={koMatches.final} matchKey="final" updateScore={updateKoScore} isFinal={true}
                       />
                   )}

                   {(tournamentMode === '1_gruppe_top4' || tournamentMode === '2_gruppen_kreuz') && (
                       <MatchCard 
                          teamA={
                            getWinner(koMatches.sf1, tournamentMode === '1_gruppe_top4' ? tableA[0] : tableA[0], tournamentMode === '1_gruppe_top4' ? tableA[3] : tableB[1]) 
                            || { name: 'Sieger HF 1' }
                          } 
                          teamB={
                            getWinner(koMatches.sf2, tournamentMode === '1_gruppe_top4' ? tableA[1] : tableB[0], tournamentMode === '1_gruppe_top4' ? tableA[2] : tableA[1]) 
                            || { name: 'Sieger HF 2' }
                          }
                          matchData={koMatches.final} matchKey="final" updateScore={updateKoScore} isFinal={true}
                       />
                   )}
                </div>
                </>
            )}
          </div>
        </div>

      </div>
      
      {/* Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
      `}} />
    </div>
  );
}

function MatchCard({ teamA, teamB, matchData, matchKey, updateScore, isFinal }: any) {
  return (
    <div className={`bg-slate-50 border ${isFinal ? 'border-amber-300 shadow-sm shadow-amber-100' : 'border-slate-200'} rounded p-1.5`}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-1">
          <div className={`font-bold truncate text-[11px] ${teamA?.id ? 'text-slate-900' : 'text-slate-400 italic'}`}>
              {teamA?.name || 'TBD'}
          </div>
          <input type="number" min="0" disabled={!teamA?.id} value={matchData.scoreA} onChange={(e) => updateScore(matchKey, 'scoreA', e.target.value)}
            className="w-8 h-6 bg-white border border-slate-300 rounded text-center text-[11px] font-bold text-slate-900 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
        </div>
        <div className="h-px w-full bg-slate-200"></div>
        <div className="flex items-center justify-between gap-1">
          <div className={`font-bold truncate text-[11px] ${teamB?.id ? 'text-slate-900' : 'text-slate-400 italic'}`}>
              {teamB?.name || 'TBD'}
          </div>
          <input type="number" min="0" disabled={!teamB?.id} value={matchData.scoreB} onChange={(e) => updateScore(matchKey, 'scoreB', e.target.value)}
            className="w-8 h-6 bg-white border border-slate-300 rounded text-center text-[11px] font-bold text-slate-900 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}