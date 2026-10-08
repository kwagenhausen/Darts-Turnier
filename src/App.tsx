import React, { useState, useEffect } from 'react';

// --- Inline Icons ---
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;

export default function App() {
  // --- STATE ---
  const [isStarted, setIsStarted] = useState(false);
  const [config, setConfig] = useState({
    name: 'Elmenhorster Darts Open',
    info: 'Game On! 301 Single Out.',
    art: 'team', 
    boards: 2,   
    modus: 'elmenhorst',
  });
  const [teams, setTeams] = useState([
    { id: 't1', name: '26er', p1: 'Lasse', p2: 'Lenny' },
    { id: 't2', name: 'Martial Darts', p1: 'Kevin', p2: 'Mats' },
    { id: 't3', name: 'The Darts Knights', p1: 'Veith', p2: 'Paddy' },
    { id: 't4', name: 'The Lucky Two', p1: 'Remi', p2: 'Jens' },
    { id: 't5', name: 'Dart Vaders', p1: 'Luke', p2: 'Anakin' },
    { id: 't6', name: 'Bullseye Bandits', p1: 'Robin', p2: 'Hood' },
  ]);
  const [matches, setMatches] = useState([]);

  // LocalStorage Laden
  useEffect(() => {
    const saved = localStorage.getItem('dartsApp_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setIsStarted(parsed.isStarted);
        setConfig(parsed.config || config);
        setTeams(parsed.teams || teams);
        setMatches(parsed.matches || []);
      } catch (e) {
        console.error("Fehler beim Laden", e);
      }
    }
  }, []);

  // LocalStorage Speichern
  useEffect(() => {
    localStorage.setItem('dartsApp_v5', JSON.stringify({ isStarted, config, teams, matches }));
  }, [isStarted, config, teams, matches]);

  // --- LOGIK ---
  const handleStart = () => {
    if (teams.length < 3) {
      alert("Bitte mindestens 3 Teams/Spieler anlegen.");
      return;
    }
    
    // Richtiges Turnier-System (Round-Robin / Circle Method) für ausgewogene Spielpausen
    let matchPool = [];
    let numTeams = teams.length;
    let playTeams = [...teams];
    
    // Wenn ungerade, ein Dummy-Team für "Freilos" (Bye) hinzufügen
    if (numTeams % 2 !== 0) {
      playTeams.push({ id: 'bye', name: 'BYE' });
      numTeams++;
    }
    
    let rounds = numTeams - 1;
    let half = numTeams / 2;
    
    for (let round = 0; round < rounds; round++) {
      for (let i = 0; i < half; i++) {
        let t1 = playTeams[i];
        let t2 = playTeams[numTeams - 1 - i];
        
        // Match hinzufügen, wenn kein Freilos dabei ist
        if (t1.id !== 'bye' && t2.id !== 'bye') {
          matchPool.push({ team1Id: t1.id, team2Id: t2.id });
        }
      }
      
      // Teams im Kreis rotieren (Team 0 bleibt fest, der Rest rückt auf)
      const last = playTeams.pop();
      playTeams.splice(1, 0, last);
    }
    
    // Matches den Boards zuweisen und Nummerieren
    let newMatches = [];
    let boardCounts = Array(config.boards + 1).fill(1); // Zähler pro Board
    
    matchPool.forEach((match, index) => {
      const boardNum = (index % config.boards) + 1;
      newMatches.push({
        id: `m${index + 1}`,
        team1Id: match.team1Id,
        team2Id: match.team2Id,
        score1: '',
        score2: '',
        board: boardNum,
        matchNumBoard: boardCounts[boardNum]++
      });
    });
    
    setMatches(newMatches);
    setIsStarted(true);
  };

  const handleReset = () => {
    if (window.confirm("Turnier wirklich beenden? Alle Spielstände der Vorrunde gehen verloren!")) {
      setIsStarted(false);
      setMatches([]);
    }
  };

  const updateScore = (matchId, teamNum, value) => {
    setMatches(matches.map(m => {
      if (m.id === matchId) {
        return { ...m, [teamNum === 1 ? 'score1' : 'score2']: value };
      }
      return m;
    }));
  };

  const getTable = () => {
    let table = teams.map(t => ({ id: t.id, name: t.name, games: 0, legsWon: 0, legsLost: 0, diff: 0 }));
    
    matches.forEach(m => {
      if (m.score1 !== '' && m.score2 !== '') {
        const s1 = parseInt(m.score1) || 0;
        const s2 = parseInt(m.score2) || 0;
        
        let t1 = table.find(t => t.id === m.team1Id);
        let t2 = table.find(t => t.id === m.team2Id);
        
        if (t1 && t2) {
          t1.games += 1;
          t2.games += 1;
          t1.legsWon += s1;
          t1.legsLost += s2;
          t2.legsWon += s2;
          t2.legsLost += s1;
          t1.diff = t1.legsWon - t1.legsLost;
          t2.diff = t2.legsWon - t2.legsLost;
        }
      }
    });

    return table.sort((a, b) => b.diff - a.diff || b.legsWon - a.legsWon);
  };

  const tableData = getTable();
  const placesToAdvance = config.modus === 'elmenhorst' ? 3 : 4;

  // --- RENDER SETUP ---
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 p-8 font-sans flex justify-center items-start">
        <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <TrophyIcon />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">Darts Turnier Manager</h1>
            <p className="text-slate-500 mt-2">Turnier-Setup konfigurieren</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Turniername</label>
              <input type="text" value={config.name} onChange={e => setConfig({...config, name: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Zusatzinfos (TV-Header)</label>
              <input type="text" value={config.info} onChange={e => setConfig({...config, info: e.target.value})} placeholder="z.B. 301 Single Out - Best of 14 Legs" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Art</label>
              <select value={config.art} onChange={e => setConfig({...config, art: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg bg-white">
                <option value="team">Teams (2 Spieler)</option>
                <option value="einzel">Einzelspieler</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Anzahl Boards</label>
              <select value={config.boards} onChange={e => setConfig({...config, boards: parseInt(e.target.value)})} className="w-full p-3 border border-slate-300 rounded-lg bg-white">
                <option value={1}>1 Board</option>
                <option value={2}>2 Boards</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Turnier-Modus</label>
              <select value={config.modus} onChange={e => setConfig({...config, modus: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg bg-white">
                <option value="elmenhorst">Liga + Elmenhorst-Regel (Platz 1 im Finale, 2 vs 3 im HF)</option>
                <option value="standard">Liga + Standard Halbfinale (1. vs 4. / 2. vs 3.)</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-4">
              <UserIcon /> Teilnehmer ({teams.length})
            </label>
            <div className="space-y-3">
              {teams.map((team, index) => (
                <div key={team.id} className="flex gap-3 items-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 flex-shrink-0 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <input type="text" value={team.name} placeholder={config.art === 'team' ? "Teamname" : "Spielername"} onChange={e => {
                    const newTeams = [...teams];
                    newTeams[index].name = e.target.value;
                    setTeams(newTeams);
                  }} className="flex-[2] p-2 border border-slate-200 rounded bg-white text-sm font-semibold" />
                  
                  {config.art === 'team' && (
                    <>
                      <input type="text" value={team.p1} placeholder="Spieler 1" onChange={e => {
                        const newTeams = [...teams]; newTeams[index].p1 = e.target.value; setTeams(newTeams);
                      }} className="flex-1 p-2 border border-slate-200 rounded bg-white text-sm" />
                      <input type="text" value={team.p2} placeholder="Spieler 2" onChange={e => {
                        const newTeams = [...teams]; newTeams[index].p2 = e.target.value; setTeams(newTeams);
                      }} className="flex-1 p-2 border border-slate-200 rounded bg-white text-sm" />
                    </>
                  )}
                  
                  <button onClick={() => setTeams(teams.filter(t => t.id !== team.id))} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setTeams([...teams, { id: Date.now().toString(), name: '', p1: '', p2: '' }])} className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800">
              <PlusIcon /> Weiteren Teilnehmer hinzufügen
            </button>
          </div>

          <button onClick={handleStart} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
            <PlayIcon /> Turnier starten
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER TV DASHBOARD ---
  
  return (
    <div className="h-screen flex flex-col bg-slate-100 font-sans text-slate-800 overflow-hidden">
      {/* HEADER */}
      <header className="flex-none h-16 bg-white border-b border-slate-200 shadow-sm px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-inner">
            <TrophyIcon />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 leading-tight">{config.name}</h1>
            <p className="text-xs font-semibold text-slate-500">{config.info}</p>
          </div>
        </div>
        <button onClick={handleReset} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors bg-slate-50 hover:bg-red-50 px-4 py-2 rounded-lg border border-slate-200">
          <SettingsIcon /> Setup / Beenden
        </button>
      </header>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="flex-1 flex gap-4 p-4 min-h-0">
        
        {/* Linke Seite: Spielplan */}
        <div className="flex-[2] flex gap-4 min-h-0">
          {[...Array(config.boards)].map((_, boardIdx) => {
            const boardNum = boardIdx + 1;
            const boardMatches = config.boards === 1 ? matches : matches.filter(m => m.board === boardNum);
            
            return (
              <div key={boardNum} className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-800 text-white py-2 px-4 flex justify-between items-center flex-none">
                  <h2 className="font-bold uppercase tracking-wide text-sm">{config.boards === 2 ? `Board ${boardNum}` : 'Kompletter Spielplan'}</h2>
                  <span className="text-xs bg-slate-700 px-2 py-1 rounded-md">{boardMatches.length} Spiele</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50/50">
                  {boardMatches.map((match, idx) => {
                    const team1 = teams.find(t => t.id === match.team1Id);
                    const team2 = teams.find(t => t.id === match.team2Id);
                    const isPlayed = match.score1 !== '' && match.score2 !== '';
                    
                    return (
                      <div key={match.id} className={`flex items-center justify-between p-2 rounded-lg border ${isPlayed ? 'bg-white border-slate-200 opacity-60' : 'bg-white border-blue-100 shadow-sm'}`}>
                        
                        {/* Spielnummer Anzeige */}
                        <div className="flex-none w-10 text-center border-r border-slate-200 pr-2 mr-2">
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Spiel</div>
                          <div className="text-sm font-black text-slate-700">{match.matchNumBoard || idx + 1}</div>
                        </div>

                        <div className="flex-1 text-right pr-4">
                          <div className="font-bold text-slate-800 text-sm">{team1?.name}</div>
                          {config.art === 'team' && <div className="text-[10px] text-slate-500">{team1?.p1} & {team1?.p2}</div>}
                        </div>
                        
                        <div className="flex items-center gap-2 flex-none">
                          <input type="number" min="0" value={match.score1} onChange={(e) => updateScore(match.id, 1, e.target.value)} className="w-12 h-10 text-center font-bold text-lg bg-slate-100 border border-slate-300 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                          <span className="text-slate-400 font-bold">:</span>
                          <input type="number" min="0" value={match.score2} onChange={(e) => updateScore(match.id, 2, e.target.value)} className="w-12 h-10 text-center font-bold text-lg bg-slate-100 border border-slate-300 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        
                        <div className="flex-1 pl-4">
                          <div className="font-bold text-slate-800 text-sm">{team2?.name}</div>
                          {config.art === 'team' && <div className="text-[10px] text-slate-500">{team2?.p1} & {team2?.p2}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rechte Seite: Tabelle & K.O. Baum */}
        <div className="flex-[1] flex flex-col gap-4 min-h-0">
          
          {/* Tabelle */}
          <div className="flex-[3] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-0">
            <div className="bg-blue-600 text-white py-2 px-4 flex-none">
              <h2 className="font-bold uppercase tracking-wide text-sm">Live-Tabelle</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-500 text-xs uppercase sticky top-0 shadow-sm z-10">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Team</th>
                    <th className="p-3 text-center">Sp</th>
                    <th className="p-3 text-center">Legs</th>
                    <th className="p-3 text-center">Diff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableData.map((row, index) => {
                    const advances = index < placesToAdvance;
                    return (
                      <tr key={row.id} className={advances ? 'bg-green-50/50' : 'bg-red-50/30'}>
                        <td className="p-3 font-bold text-slate-500">
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-xs ${advances ? 'bg-green-200 text-green-800' : 'bg-slate-200 text-slate-600'}`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="p-3 font-bold text-slate-800 truncate max-w-[120px]">{row.name}</td>
                        <td className="p-3 text-center font-semibold">{row.games}</td>
                        <td className="p-3 text-center">{row.legsWon}:{row.legsLost}</td>
                        <td className="p-3 text-center font-bold">{row.diff > 0 ? `+${row.diff}` : row.diff}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live K.O. Baum */}
          <div className="flex-[2] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-0">
            <div className="bg-slate-800 text-white py-2 px-4 flex-none">
              <h2 className="font-bold uppercase tracking-wide text-sm">Live Finalrunde</h2>
            </div>
            <div className="flex-1 p-3 bg-slate-50 overflow-y-auto flex flex-col justify-center gap-2">
              
              {config.modus === 'elmenhorst' ? (
                <>
                  <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
                    <div className="bg-slate-200 text-[10px] font-bold px-2 py-1 text-slate-600 text-center uppercase tracking-wide">Halbfinale</div>
                    <div className="p-1.5 text-center text-sm font-bold text-slate-800 border-b border-slate-100 truncate">{tableData[1]?.name || '2. Platz'}</div>
                    <div className="p-1.5 text-center text-sm font-bold text-slate-800 truncate">{tableData[2]?.name || '3. Platz'}</div>
                  </div>
                  <div className="border-2 border-amber-400 rounded bg-amber-50 overflow-hidden shadow-sm mt-1">
                    <div className="bg-amber-400 text-[10px] font-extrabold px-2 py-1 text-amber-900 text-center uppercase tracking-wide">Finale</div>
                    <div className="p-1.5 text-center text-sm font-bold text-slate-800 border-b border-amber-200 truncate">{tableData[0]?.name || '1. Platz'}</div>
                    <div className="p-1.5 text-center text-xs font-bold text-amber-700/60 italic truncate">Sieger Halbfinale</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
                      <div className="bg-slate-200 text-[10px] font-bold px-2 py-1 text-slate-600 text-center uppercase tracking-wide">Halbfinale 1</div>
                      <div className="p-1.5 text-center text-xs font-bold text-slate-800 border-b border-slate-100 truncate">{tableData[0]?.name || '1. Platz'}</div>
                      <div className="p-1.5 text-center text-xs font-bold text-slate-800 truncate">{tableData[3]?.name || '4. Platz'}</div>
                    </div>
                    <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
                      <div className="bg-slate-200 text-[10px] font-bold px-2 py-1 text-slate-600 text-center uppercase tracking-wide">Halbfinale 2</div>
                      <div className="p-1.5 text-center text-xs font-bold text-slate-800 border-b border-slate-100 truncate">{tableData[1]?.name || '2. Platz'}</div>
                      <div className="p-1.5 text-center text-xs font-bold text-slate-800 truncate">{tableData[2]?.name || '3. Platz'}</div>
                    </div>
                  </div>
                  <div className="border-2 border-amber-400 rounded bg-amber-50 overflow-hidden shadow-sm mt-1">
                    <div className="bg-amber-400 text-[10px] font-extrabold px-2 py-1 text-amber-900 text-center uppercase tracking-wide">Finale</div>
                    <div className="p-1.5 text-center text-xs font-bold text-amber-700/60 italic border-b border-amber-200 truncate">Sieger HF 1</div>
                    <div className="p-1.5 text-center text-xs font-bold text-amber-700/60 italic truncate">Sieger HF 2</div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}