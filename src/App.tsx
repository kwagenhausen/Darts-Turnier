import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

// --- Firebase Setup ---
const firebaseConfig = {
  apiKey: "AIzaSyBK0G_704HgkBMV3IC_4-sqqjqPh7_IebM",
  authDomain: "darts-app-9d76e.firebaseapp.com",
  databaseURL: "https://darts-app-9d76e-default-rtdb.europe-west1.firebasedatabase.app", 
  projectId: "darts-app-9d76e",
  storageBucket: "darts-app-9d76e.firebasestorage.app",
  messagingSenderId: "988886363315",
  appId: "1:988886363315:web:750868f962555200d394c6",
  measurementId: "G-0NDN7RCDC2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- Inline Icons ---
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>;

const addMinutes = (timeStr, minsToAdd) => {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  date.setMinutes(date.getMinutes() + minsToAdd);
  return date.toTimeString().slice(0, 5);
};

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState('tv');
  
  const [config, setConfig] = useState({
    name: 'Elmenhorster Darts Open', info: 'Jahresturnier', art: 'team', boards: 2, modus: 'standard',
    startTime: '19:00', vorrundeLegs: 14, vorrundeMinsPerLeg: 5, vorrundePause: 5, vorrundeModus: '301 Single Out',
    hfBestOf: 5, hfModus: '501 Double Out', finBestOf: 7, finModus: '501 Double Out',
  });
  
  const [teams, setTeams] = useState([
    { id: 't1', name: '26er', p1: 'Lasse', p2: 'Lenny' },
    { id: 't2', name: 'Martial Darts', p1: 'Kevin', p2: 'Mats' },
    { id: 't3', name: 'The Darts Knights', p1: 'Veith', p2: 'Paddy' },
    { id: 't4', name: 'The Lucky Two', p1: 'Remi', p2: 'Jens' }
  ]);
  
  const [matches, setMatches] = useState([]);
  const [koScores, setKoScores] = useState({ hf1_1: '', hf1_2: '', hf2_1: '', hf2_2: '', fin_1: '', fin_2: '' });

  useEffect(() => {
    const dbRef = ref(db, 'turnier');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsStarted(data.isStarted || false);
        if (data.config) setConfig(data.config);
        if (data.teams) setTeams(data.teams);
        if (data.matches) setMatches(data.matches);
        if (data.koScores) setKoScores(data.koScores);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleConfigChange = (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    set(ref(db, 'turnier/config'), newConfig);
  };

  const handleTeamChange = (index, key, value) => {
    const newTeams = [...teams];
    newTeams[index][key] = value;
    setTeams(newTeams);
    set(ref(db, 'turnier/teams'), newTeams);
  };

  const handleAddTeam = () => {
    const newTeams = [...teams, { id: Date.now().toString(), name: '', p1: '', p2: '' }];
    setTeams(newTeams);
    set(ref(db, 'turnier/teams'), newTeams);
  };

  const handleRemoveTeam = (id) => {
    const newTeams = teams.filter(t => t.id !== id);
    setTeams(newTeams);
    set(ref(db, 'turnier/teams'), newTeams);
  };

  const handleStart = () => {
    if (teams.length < 3) return alert("Bitte mindestens 3 Teams/Spieler anlegen.");
    let matchPool = [];
    let numTeams = teams.length;
    let playTeams = [...teams];
    if (numTeams % 2 !== 0) { playTeams.push({ id: 'bye', name: 'BYE' }); numTeams++; }
    let rounds = numTeams - 1;
    let half = numTeams / 2;
    for (let round = 0; round < rounds; round++) {
      for (let i = 0; i < half; i++) {
        let t1 = playTeams[i]; let t2 = playTeams[numTeams - 1 - i];
        if (t1.id !== 'bye' && t2.id !== 'bye') matchPool.push({ team1Id: t1.id, team2Id: t2.id });
      }
      const last = playTeams.pop(); playTeams.splice(1, 0, last);
    }
    let newMatches = [];
    let boardCounts = Array(config.boards + 1).fill(1); 
    let boardTimes = Array(config.boards + 1).fill(config.startTime);
    let durationPerMatch = (config.vorrundeLegs * config.vorrundeMinsPerLeg) + config.vorrundePause; 
    let teamBoardUsage = {};
    teams.forEach(t => teamBoardUsage[t.id] = Array(config.boards + 1).fill(0));
    let globalBoardUsage = Array(config.boards + 1).fill(0);

    matchPool.forEach((match, index) => {
      let assignedBoard = 1;
      if (config.boards > 1) {
        let bestBoard = 1; let minCost = Infinity;
        for (let b = 1; b <= config.boards; b++) {
          let cost = teamBoardUsage[match.team1Id][b] + teamBoardUsage[match.team2Id][b];
          if (cost < minCost || (cost === minCost && globalBoardUsage[b] < globalBoardUsage[bestBoard])) { minCost = cost; bestBoard = b; }
        }
        assignedBoard = bestBoard;
      }
      if (config.boards > 1) { teamBoardUsage[match.team1Id][assignedBoard]++; teamBoardUsage[match.team2Id][assignedBoard]++; globalBoardUsage[assignedBoard]++; }
      let matchTime = boardTimes[assignedBoard];
      newMatches.push({ id: `m${index + 1}`, team1Id: match.team1Id, team2Id: match.team2Id, score1: '', score2: '', board: assignedBoard, matchNumBoard: boardCounts[assignedBoard]++, time: matchTime });
      boardTimes[assignedBoard] = addMinutes(matchTime, durationPerMatch);
    });
    const freshKoScores = { hf1_1: '', hf1_2: '', hf2_1: '', hf2_2: '', fin_1: '', fin_2: '' };
    set(ref(db, 'turnier'), { isStarted: true, config, teams, matches: newMatches, koScores: freshKoScores });
  };

  const handleReset = () => {
    if (window.confirm("Turnier wirklich beenden? Alle Spielstände gehen verloren!")) {
      const freshKoScores = { hf1_1: '', hf1_2: '', hf2_1: '', hf2_2: '', fin_1: '', fin_2: '' };
      set(ref(db, 'turnier'), { isStarted: false, config, teams, matches: [], koScores: freshKoScores });
    }
  };

  const updateScore = (matchId, teamNum, value) => {
    const newMatches = matches.map(m => {
      if (m.id === matchId) return { ...m, [teamNum === 1 ? 'score1' : 'score2']: value };
      return m;
    });
    setMatches(newMatches);
    set(ref(db, 'turnier/matches'), newMatches);
  };

  const updateKoScore = (matchKey, teamNum, value) => {
    const newKo = { ...koScores, [`${matchKey}_${teamNum}`]: value };
    setKoScores(newKo);
    set(ref(db, 'turnier/koScores'), newKo);
  };

  const handleExport = async () => {
    const element = document.getElementById('export-area');
    if (!element) return;
    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element, { backgroundColor: '#f1f5f9', scale: 2 }); 
      const data = canvas.toDataURL('image/png');
      const link = document.createElement('a'); link.href = data;
      link.download = `${config.name.replace(/\s+/g, '_')}_Ergebnisse.png`; link.click();
    } catch (err) { alert("Bild-Export fehlgeschlagen."); }
    setIsExporting(false);
  };

  const getTable = () => {
    let table = teams.map(t => ({ id: t.id, name: t.name, games: 0, legsWon: 0, legsLost: 0, diff: 0 }));
    matches.forEach(m => {
      if (m.score1 !== '' && m.score2 !== '') {
        const s1 = parseInt(m.score1) || 0; const s2 = parseInt(m.score2) || 0;
        let t1 = table.find(t => t.id === m.team1Id); let t2 = table.find(t => t.id === m.team2Id);
        if (t1 && t2) {
          t1.games += 1; t2.games += 1; t1.legsWon += s1; t1.legsLost += s2; t2.legsWon += s2; t2.legsLost += s1;
          t1.diff = t1.legsWon - t1.legsLost; t2.diff = t2.legsWon - t2.legsLost;
        }
      }
    });
    return table.sort((a, b) => b.diff - a.diff || b.legsWon - a.legsWon);
  };

  const tableData = getTable();
  const placesToAdvance = config.modus === 'elmenhorst' ? 3 : 4;

  const getKoTeams = () => {
    let hf1_team1, hf1_team2, hf2_team1, hf2_team2, fin_team1, fin_team2;
    if (config.modus === 'elmenhorst') {
      hf1_team1 = tableData[1]?.name || '2. Platz'; hf1_team2 = tableData[2]?.name || '3. Platz';
      fin_team1 = tableData[0]?.name || '1. Platz';
      const s1 = parseInt(koScores.hf1_1); const s2 = parseInt(koScores.hf1_2);
      fin_team2 = (!isNaN(s1) && !isNaN(s2) && s1 !== s2) ? (s1 > s2 ? hf1_team1 : hf1_team2) : 'Sieger Halbfinale';
    } else {
      hf1_team1 = tableData[0]?.name || '1. Platz'; hf1_team2 = tableData[3]?.name || '4. Platz';
      hf2_team1 = tableData[1]?.name || '2. Platz'; hf2_team2 = tableData[2]?.name || '3. Platz';
      const h1_s1 = parseInt(koScores.hf1_1); const h1_s2 = parseInt(koScores.hf1_2);
      fin_team1 = (!isNaN(h1_s1) && !isNaN(h1_s2) && h1_s1 !== h1_s2) ? (h1_s1 > h1_s2 ? hf1_team1 : hf1_team2) : 'Sieger HF 1';
      const h2_s1 = parseInt(koScores.hf2_1); const h2_s2 = parseInt(koScores.hf2_2);
      fin_team2 = (!isNaN(h2_s1) && !isNaN(h2_s2) && h2_s1 !== h2_s2) ? (h2_s1 > h2_s2 ? hf2_team1 : hf2_team2) : 'Sieger HF 2';
    }
    return { hf1_team1, hf1_team2, hf2_team1, hf2_team2, fin_team1, fin_team2 };
  };

  const koTeams = getKoTeams();
  let turnierSieger = null;
  const f1 = parseInt(koScores.fin_1); const f2 = parseInt(koScores.fin_2);
  if (!isNaN(f1) && !isNaN(f2) && f1 !== f2) turnierSieger = f1 > f2 ? koTeams.fin_team1 : koTeams.fin_team2;

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 font-sans flex justify-center items-start">
        <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <TrophyIcon />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center">Darts Turnier Manager</h1>
            <p className="text-slate-500 mt-2 font-semibold">Live Cloud Sync aktiv ☁️</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-100">
            <h3 className="col-span-1 md:col-span-2 font-bold text-slate-700 text-lg border-b border-slate-200 pb-2">1. Allgemein</h3>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Turniername</label>
              <input type="text" value={config.name} onChange={e => handleConfigChange('name', e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Art</label>
              <select value={config.art} onChange={e => handleConfigChange('art', e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg bg-white">
                <option value="team">Teams (2 Spieler)</option><option value="einzel">Einzelspieler</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Anzahl Boards</label>
              <select value={config.boards} onChange={e => handleConfigChange('boards', parseInt(e.target.value))} className="w-full p-3 border border-slate-300 rounded-lg bg-white">
                <option value={1}>1 Board</option><option value={2}>2 Boards</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Turnier-Modus</label>
              <select value={config.modus} onChange={e => handleConfigChange('modus', e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg bg-white">
                <option value="elmenhorst">Liga + Elmenhorst-Regel (Platz 1 im Finale, 2 vs 3 im HF)</option>
                <option value="standard">Liga + Standard Halbfinale (1. vs 4. / 2. vs 3.)</option>
              </select>
            </div>
          </div>
          <div className="mb-8 bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-100">
            <h3 className="font-bold text-slate-700 text-lg border-b border-slate-200 pb-2 mb-4">2. Zeitplan & Modus</h3>
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Startzeit Turnier</label>
              <input type="time" value={config.startTime} onChange={e => handleConfigChange('startTime', e.target.value)} className="p-3 border border-slate-300 rounded-lg bg-white font-bold text-slate-700 w-full md:w-auto" />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end bg-white p-3 rounded-lg border border-slate-200">
                <div className="col-span-2 md:col-span-5 text-sm font-bold text-blue-600 mb-1">Vorrunde</div>
                <div><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Feste Legs</label><input type="number" min="1" value={config.vorrundeLegs} onChange={e => handleConfigChange('vorrundeLegs', parseInt(e.target.value) || 0)} className="w-full p-2 border border-slate-300 rounded" /></div>
                <div><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Min. pro Leg</label><input type="number" min="1" value={config.vorrundeMinsPerLeg} onChange={e => handleConfigChange('vorrundeMinsPerLeg', parseInt(e.target.value) || 0)} className="w-full p-2 border border-slate-300 rounded" /></div>
                <div><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Pause (Min)</label><input type="number" min="0" value={config.vorrundePause} onChange={e => handleConfigChange('vorrundePause', parseInt(e.target.value) || 0)} className="w-full p-2 border border-slate-300 rounded" /></div>
                <div className="col-span-2"><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Modus</label><input type="text" value={config.vorrundeModus} onChange={e => handleConfigChange('vorrundeModus', e.target.value)} className="w-full p-2 border border-slate-300 rounded" /></div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end bg-white p-3 rounded-lg border border-slate-200">
                <div className="col-span-4 text-sm font-bold text-slate-800 mb-1">Halbfinale</div>
                <div className="col-span-1"><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">First to (Legs)</label><input type="number" min="1" value={config.hfBestOf} onChange={e => handleConfigChange('hfBestOf', parseInt(e.target.value) || 0)} className="w-full p-2 border border-slate-300 rounded" /></div>
                <div className="col-span-3"><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Modus</label><input type="text" value={config.hfModus} onChange={e => handleConfigChange('hfModus', e.target.value)} className="w-full p-2 border border-slate-300 rounded" /></div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end bg-white p-3 rounded-lg border border-slate-200">
                <div className="col-span-4 text-sm font-bold text-amber-600 mb-1">Finale</div>
                <div className="col-span-1"><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">First to (Legs)</label><input type="number" min="1" value={config.finBestOf} onChange={e => handleConfigChange('finBestOf', parseInt(e.target.value) || 0)} className="w-full p-2 border border-slate-300 rounded" /></div>
                <div className="col-span-3"><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Modus</label><input type="text" value={config.finModus} onChange={e => handleConfigChange('finModus', e.target.value)} className="w-full p-2 border border-slate-300 rounded" /></div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="font-bold text-slate-700 text-lg border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">3. Teilnehmer ({teams.length})</h3>
            <div className="space-y-3">
              {teams.map((team, index) => (
                <div key={team.id} className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 items-center bg-slate-50 p-2 md:p-3 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 flex-shrink-0 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">{index + 1}</div>
                  <input type="text" value={team.name} placeholder={config.art === 'team' ? "Teamname" : "Spielername"} onChange={e => handleTeamChange(index, 'name', e.target.value)} className="flex-1 min-w-[120px] p-2 border border-slate-200 rounded bg-white text-sm font-semibold" />
                  {config.art === 'team' && (
                    <>
                      <input type="text" value={team.p1} placeholder="Sp. 1" onChange={e => handleTeamChange(index, 'p1', e.target.value)} className="w-1/3 md:flex-1 p-2 border border-slate-200 rounded bg-white text-sm" />
                      <input type="text" value={team.p2} placeholder="Sp. 2" onChange={e => handleTeamChange(index, 'p2', e.target.value)} className="w-1/3 md:flex-1 p-2 border border-slate-200 rounded bg-white text-sm" />
                    </>
                  )}
                  <button onClick={() => handleRemoveTeam(team.id)} className="p-2 text-red-400 hover:text-red-600 bg-red-50 rounded-lg"><TrashIcon /></button>
                </div>
              ))}
            </div>
            <button onClick={handleAddTeam} className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"><PlusIcon /> Weiteren Teilnehmer hinzufügen</button>
          </div>
          <button onClick={handleStart} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
            <PlayIcon /> Turnier starten (Cloud Sync)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-slate-100 font-sans text-slate-800 lg:overflow-hidden">
      
      <header className="flex-none bg-white border-b border-slate-200 shadow-sm px-4 md:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-inner flex-shrink-0">
            <TrophyIcon />
          </div>
          <div className="flex-1 truncate">
            <h1 className="text-lg md:text-xl font-extrabold text-slate-900 truncate">{config.name}</h1>
            <p className="text-[10px] md:text-xs font-semibold text-slate-500 truncate">
              Vorrunde: {config.vorrundeLegs} Legs ({config.vorrundeModus}) | {config.startTime} Uhr
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select value={viewMode} onChange={(e) => setViewMode(e.target.value)} className="bg-slate-100 border border-slate-300 text-slate-800 font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 shadow-sm">
            <option value="tv">📺 Haupt-Ansicht (TV)</option>
            {[...Array(config.boards)].map((_, i) => (
              <option key={`b${i+1}`} value={`board${i+1}`}>🎯 Board {i+1} Controller</option>
            ))}
            <option value="ko">🏆 Finalrunde</option>
          </select>
          {viewMode === 'tv' && (
            <button onClick={handleExport} disabled={isExporting} className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200 flex-shrink-0">
              <CameraIcon /> <span className="hidden sm:inline">{isExporting ? 'Speichert...' : 'Screenshot'}</span>
            </button>
          )}
          <button onClick={handleReset} className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-semibold text-slate-500 hover:text-red-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 flex-shrink-0">
            <SettingsIcon /> <span className="hidden sm:inline">Setup</span>
          </button>
        </div>
      </header>

      {/* --- TV DASHBOARD --- */}
      {viewMode === 'tv' && (
        <main id="export-area" className="flex-1 flex flex-col lg:flex-row gap-4 p-4 min-h-0 bg-slate-100 overflow-y-auto lg:overflow-hidden">
          <div className="flex-[2] flex flex-col sm:flex-row gap-4 min-h-0 shrink-0">
            {[...Array(config.boards)].map((_, boardIdx) => {
              const boardNum = boardIdx + 1;
              const boardMatches = config.boards === 1 ? matches : matches.filter(m => m.board === boardNum);
              return (
                <div key={boardNum} className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[300px]">
                  <div className="bg-slate-800 text-white py-2 px-4 flex justify-between items-center flex-none">
                    <h2 className="font-bold uppercase tracking-wide text-sm">{config.boards === 2 ? `Board ${boardNum}` : 'Spielplan'}</h2>
                    <span className="text-xs bg-slate-700 px-2 py-1 rounded-md">{boardMatches.length} Spiele</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-2 bg-slate-50/50">
                    {boardMatches.map((match, idx) => {
                      const team1 = teams.find(t => t.id === match.team1Id);
                      const team2 = teams.find(t => t.id === match.team2Id);
                      const isPlayed = match.score1 !== '' && match.score2 !== '';
                      return (
                        <div key={match.id} className={`flex items-center justify-between p-2 rounded-lg border ${isPlayed ? 'bg-white border-slate-200 opacity-60' : 'bg-white border-blue-100 shadow-sm'}`}>
                          <div className="flex-none w-12 md:w-16 text-center border-r border-slate-200 pr-2 mr-2">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Spiel {match.matchNumBoard || idx + 1}</div>
                            <div className="text-xs md:text-sm font-black text-slate-700 flex items-center justify-center gap-1"><ClockIcon /> {match.time}</div>
                          </div>
                          <div className="flex-1 text-right pr-2 md:pr-4 truncate">
                            <div className="font-bold text-slate-800 text-xs md:text-sm truncate">{team1?.name}</div>
                            {config.art === 'team' && <div className="text-[9px] md:text-[10px] text-slate-500 truncate">{team1?.p1} & {team1?.p2}</div>}
                          </div>
                          <div className="flex items-center gap-1 md:gap-2 flex-none">
                            <input type="number" min="0" value={match.score1} onChange={(e) => updateScore(match.id, 1, e.target.value)} className="w-10 h-8 md:w-12 md:h-10 text-center font-bold text-sm md:text-lg bg-slate-100 border border-slate-300 rounded focus:bg-white outline-none" />
                            <span className="text-slate-400 font-bold">:</span>
                            <input type="number" min="0" value={match.score2} onChange={(e) => updateScore(match.id, 2, e.target.value)} className="w-10 h-8 md:w-12 md:h-10 text-center font-bold text-sm md:text-lg bg-slate-100 border border-slate-300 rounded focus:bg-white outline-none" />
                          </div>
                          <div className="flex-1 pl-2 md:pl-4 truncate">
                            <div className="font-bold text-slate-800 text-xs md:text-sm truncate">{team2?.name}</div>
                            {config.art === 'team' && <div className="text-[9px] md:text-[10px] text-slate-500 truncate">{team2?.p1} & {team2?.p2}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-[1] flex flex-col gap-4 min-h-0 shrink-0">
            <div className="flex-[1.2] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[250px]">
              <div className="bg-blue-600 text-white py-2 px-4 flex-none"><h2 className="font-bold uppercase tracking-wide text-sm">Live-Tabelle</h2></div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-slate-100 text-slate-500 text-[10px] md:text-xs uppercase sticky top-0 shadow-sm z-10">
                    <tr><th className="px-2 md:px-3 py-2">#</th><th className="px-2 md:px-3 py-2">Team</th><th className="px-2 md:px-3 py-2 text-center">Sp</th><th className="px-2 md:px-3 py-2 text-center">Legs</th><th className="px-2 md:px-3 py-2 text-center">Diff</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tableData.map((row, index) => {
                      const advances = index < placesToAdvance;
                      return (
                        <tr key={row.id} className={advances ? 'bg-green-50/50' : 'bg-red-50/30'}>
                          <td className="px-2 md:px-3 py-2 font-bold text-slate-500"><div className={`w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center text-[10px] md:text-xs ${advances ? 'bg-green-200 text-green-800' : 'bg-slate-200 text-slate-600'}`}>{index + 1}</div></td>
                          <td className="px-2 md:px-3 py-2 font-bold text-slate-800 truncate max-w-[100px] md:max-w-[120px]">{row.name}</td>
                          <td className="px-2 md:px-3 py-2 text-center font-semibold">{row.games}</td>
                          <td className="px-2 md:px-3 py-2 text-center">{row.legsWon}:{row.legsLost}</td>
                          <td className="px-2 md:px-3 py-2 text-center font-bold">{row.diff > 0 ? `+${row.diff}` : row.diff}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex-[1] flex flex-col bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden min-h-[250px]">
              <div className="bg-slate-800 text-white py-2 px-4 flex-none"><h2 className="font-bold uppercase tracking-wide text-sm">Live Finalrunde</h2></div>
              <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-slate-50 flex flex-col justify-start gap-3 md:gap-4">
                {config.modus === 'elmenhorst' ? (
                  <div className="border border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm flex-none">
                    <div className="bg-slate-200 flex justify-between items-center px-3 py-2 border-b border-slate-300">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Halbfinale</span>
                      <span className="text-[10px] font-bold text-slate-500 italic">First to {config.hfBestOf} • {config.hfModus}</span>
                    </div>
                    <div className="p-2 flex items-center justify-between border-b border-slate-100">
                      <span className="text-sm md:text-base font-bold text-slate-800 truncate pl-2">{koTeams.hf1_team1}</span>
                      <input type="number" min="0" value={koScores.hf1_1} onChange={(e) => updateKoScore('hf1', 1, e.target.value)} className="w-10 h-8 md:w-12 md:h-10 text-center font-bold text-base bg-slate-100 border border-slate-300 rounded focus:bg-white outline-none" />
                    </div>
                    <div className="p-2 flex items-center justify-between">
                      <span className="text-sm md:text-base font-bold text-slate-800 truncate pl-2">{koTeams.hf1_team2}</span>
                      <input type="number" min="0" value={koScores.hf1_2} onChange={(e) => updateKoScore('hf1', 2, e.target.value)} className="w-10 h-8 md:w-12 md:h-10 text-center font-bold text-base bg-slate-100 border border-slate-300 rounded focus:bg-white outline-none" />
                    </div>
                  </div>
                ) : (
                  <div className="flex-none">
                    <div className="text-center mb-2">
                      <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">
                        Halbfinale • First to {config.hfBestOf} • {config.hfModus}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <div className="border border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm">
                        <div className="bg-slate-200 text-center px-2 py-1 border-b border-slate-300"><span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">HF 1</span></div>
                        <div className="p-1 md:p-2 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                          <span className="text-xs md:text-sm font-bold text-slate-800 truncate pl-1">{koTeams.hf1_team1}</span>
                          <input type="number" min="0" value={koScores.hf1_1} onChange={(e) => updateKoScore('hf1', 1, e.target.value)} className="w-8 h-6 md:w-10 md:h-8 text-center font-bold text-sm bg-white border border-slate-300 rounded outline-none" />
                        </div>
                        <div className="p-1 md:p-2 flex items-center justify-between bg-slate-50/50">
                          <span className="text-xs md:text-sm font-bold text-slate-800 truncate pl-1">{koTeams.hf1_team2}</span>
                          <input type="number" min="0" value={koScores.hf1_2} onChange={(e) => updateKoScore('hf1', 2, e.target.value)} className="w-8 h-6 md:w-10 md:h-8 text-center font-bold text-sm bg-white border border-slate-300 rounded outline-none" />
                        </div>
                      </div>
                      <div className="border border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm">
                        <div className="bg-slate-200 text-center px-2 py-1 border-b border-slate-300"><span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">HF 2</span></div>
                        <div className="p-1 md:p-2 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                          <span className="text-xs md:text-sm font-bold text-slate-800 truncate pl-1">{koTeams.hf2_team1}</span>
                          <input type="number" min="0" value={koScores.hf2_1} onChange={(e) => updateKoScore('hf2', 1, e.target.value)} className="w-8 h-6 md:w-10 md:h-8 text-center font-bold text-sm bg-white border border-slate-300 rounded outline-none" />
                        </div>
                        <div className="p-1 md:p-2 flex items-center justify-between bg-slate-50/50">
                          <span className="text-xs md:text-sm font-bold text-slate-800 truncate pl-1">{koTeams.hf2_team2}</span>
                          <input type="number" min="0" value={koScores.hf2_2} onChange={(e) => updateKoScore('hf2', 2, e.target.value)} className="w-8 h-6 md:w-10 md:h-8 text-center font-bold text-sm bg-white border border-slate-300 rounded outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="border-2 border-amber-400 rounded-lg bg-amber-50 overflow-hidden shadow-md flex-none">
                  <div className="bg-amber-400 flex justify-between items-center px-3 py-2 border-b border-amber-500">
                    <span className="text-xs font-black text-amber-950 uppercase tracking-widest">Finale</span>
                    <span className="text-[10px] font-bold text-amber-900 italic">First to {config.finBestOf} • {config.finModus}</span>
                  </div>
                  <div className="p-2 md:p-2.5 flex items-center justify-between border-b border-amber-200">
                    <span className={`text-sm md:text-base font-bold truncate pl-2 ${koTeams.fin_team1.includes('Sieger') ? 'text-amber-700/60 italic' : 'text-slate-900'}`}>{koTeams.fin_team1}</span>
                    <input type="number" min="0" value={koScores.fin_1} onChange={(e) => updateKoScore('fin', 1, e.target.value)} className="w-10 h-8 md:w-12 md:h-10 text-center font-bold text-base md:text-lg bg-white border border-amber-400 rounded outline-none" />
                  </div>
                  <div className="p-2 md:p-2.5 flex items-center justify-between">
                    <span className={`text-sm md:text-base font-bold truncate pl-2 ${koTeams.fin_team2.includes('Sieger') ? 'text-amber-700/60 italic' : 'text-slate-900'}`}>{koTeams.fin_team2}</span>
                    <input type="number" min="0" value={koScores.fin_2} onChange={(e) => updateKoScore('fin', 2, e.target.value)} className="w-10 h-8 md:w-12 md:h-10 text-center font-bold text-base md:text-lg bg-white border border-amber-400 rounded outline-none" />
                  </div>
                </div>
                {turnierSieger && (
                  <div className="mt-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 p-3 md:p-4 rounded-xl text-center shadow-lg border-2 border-yellow-500 flex-none">
                    <div className="text-[10px] md:text-[11px] uppercase font-black text-amber-900 tracking-widest flex justify-center items-center gap-1 mb-1"><TrophyIcon /> Turniersieger</div>
                    <div className="text-xl md:text-2xl font-extrabold text-amber-950 truncate px-2 py-1">{turnierSieger}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* --- MOBILE BOARD CONTROLLER --- */}
      {viewMode.startsWith('board') && (() => {
        const boardNum = parseInt(viewMode.replace('board', ''));
        const boardMatches = matches.filter(m => m.board === boardNum);
        return (
          <main className="flex-1 overflow-y-auto p-4 bg-slate-800">
            <div className="max-w-md mx-auto">
              <div className="bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700 overflow-hidden">
                <div className="bg-blue-600 p-4 text-center">
                  <h2 className="text-xl font-black uppercase tracking-wider">🎯 Board {boardNum}</h2>
                  <p className="text-blue-200 text-sm">Spiel-Eingabe</p>
                </div>
                <div className="p-4 space-y-4">
                  {boardMatches.map((match, idx) => {
                    const team1 = teams.find(t => t.id === match.team1Id);
                    const team2 = teams.find(t => t.id === match.team2Id);
                    const isPlayed = match.score1 !== '' && match.score2 !== '';
                    return (
                      <div key={match.id} className={`p-4 rounded-xl border-2 ${isPlayed ? 'bg-slate-800 border-slate-700 opacity-60' : 'bg-slate-700 border-blue-500 shadow-lg'}`}>
                        <div className="flex justify-between items-center mb-3 border-b border-slate-600 pb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Spiel {match.matchNumBoard || idx + 1}</span>
                          <span className="text-sm font-black text-blue-400 flex items-center gap-1"><ClockIcon /> {match.time}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 text-right">
                            <div className="font-bold text-white text-base leading-tight">{team1?.name}</div>
                            {config.art === 'team' && <div className="text-[11px] text-slate-400 mt-1">{team1?.p1} & {team1?.p2}</div>}
                          </div>
                          <div className="flex items-center gap-2 flex-none">
                            <input type="number" min="0" value={match.score1} onChange={(e) => updateScore(match.id, 1, e.target.value)} className="w-16 h-14 text-center font-black text-2xl bg-white border-2 border-slate-400 rounded-lg focus:border-blue-500 outline-none text-slate-900" />
                            <span className="text-slate-400 font-bold text-xl">:</span>
                            <input type="number" min="0" value={match.score2} onChange={(e) => updateScore(match.id, 2, e.target.value)} className="w-16 h-14 text-center font-black text-2xl bg-white border-2 border-slate-400 rounded-lg focus:border-blue-500 outline-none text-slate-900" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-bold text-white text-base leading-tight">{team2?.name}</div>
                            {config.art === 'team' && <div className="text-[11px] text-slate-400 mt-1">{team2?.p1} & {team2?.p2}</div>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {boardMatches.length === 0 && <div className="text-center text-slate-400 py-8">Keine Spiele für dieses Board.</div>}
                </div>
              </div>
            </div>
          </main>
        );
      })()}

      {/* --- MOBILE FINALRUNDE CONTROLLER --- */}
      {viewMode === 'ko' && (
        <main className="flex-1 overflow-y-auto p-4 bg-amber-50">
          <div className="max-w-md mx-auto space-y-4">
            {config.modus === 'elmenhorst' ? (
              <div className="bg-white rounded-xl shadow-lg border border-slate-300 overflow-hidden">
                <div className="bg-slate-200 p-3 text-center border-b border-slate-300">
                  <h3 className="font-bold text-slate-700 uppercase tracking-widest">Halbfinale</h3>
                  <div className="text-xs font-semibold text-slate-500 mt-1">First to {config.hfBestOf} • {config.hfModus}</div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-slate-800 text-lg flex-1 truncate">{koTeams.hf1_team1}</span>
                    <input type="number" min="0" value={koScores.hf1_1} onChange={(e) => updateKoScore('hf1', 1, e.target.value)} className="w-16 h-14 text-center font-black text-2xl bg-slate-100 border-2 border-slate-300 rounded-lg focus:bg-white outline-none" />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-slate-800 text-lg flex-1 truncate">{koTeams.hf1_team2}</span>
                    <input type="number" min="0" value={koScores.hf1_2} onChange={(e) => updateKoScore('hf1', 2, e.target.value)} className="w-16 h-14 text-center font-black text-2xl bg-slate-100 border-2 border-slate-300 rounded-lg focus:bg-white outline-none" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-3">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-widest bg-white border border-slate-300 px-4 py-2 rounded-full shadow-sm">
                    Halbfinale • First to {config.hfBestOf} • {config.hfModus}
                  </span>
                </div>
                <div className="bg-white rounded-xl shadow-lg border border-slate-300 overflow-hidden">
                  <div className="bg-slate-200 p-2 text-center border-b border-slate-300"><h3 className="font-bold text-slate-700 uppercase tracking-widest text-sm">Halbfinale 1</h3></div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-slate-800 flex-1 truncate">{koTeams.hf1_team1}</span>
                      <input type="number" min="0" value={koScores.hf1_1} onChange={(e) => updateKoScore('hf1', 1, e.target.value)} className="w-14 h-12 text-center font-black text-xl bg-slate-100 border-2 border-slate-300 rounded-lg outline-none" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-slate-800 flex-1 truncate">{koTeams.hf1_team2}</span>
                      <input type="number" min="0" value={koScores.hf1_2} onChange={(e) => updateKoScore('hf1', 2, e.target.value)} className="w-14 h-12 text-center font-black text-xl bg-slate-100 border-2 border-slate-300 rounded-lg outline-none" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg border border-slate-300 overflow-hidden">
                  <div className="bg-slate-200 p-2 text-center border-b border-slate-300"><h3 className="font-bold text-slate-700 uppercase tracking-widest text-sm">Halbfinale 2</h3></div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-slate-800 flex-1 truncate">{koTeams.hf2_team1}</span>
                      <input type="number" min="0" value={koScores.hf2_1} onChange={(e) => updateKoScore('hf2', 1, e.target.value)} className="w-14 h-12 text-center font-black text-xl bg-slate-100 border-2 border-slate-300 rounded-lg outline-none" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-slate-800 flex-1 truncate">{koTeams.hf2_team2}</span>
                      <input type="number" min="0" value={koScores.hf2_2} onChange={(e) => updateKoScore('hf2', 2, e.target.value)} className="w-14 h-12 text-center font-black text-xl bg-slate-100 border-2 border-slate-300 rounded-lg outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-xl border-2 border-amber-400 overflow-hidden mt-6">
              <div className="bg-amber-400 p-4 text-center border-b border-amber-500">
                <h3 className="font-black text-amber-950 uppercase tracking-widest text-xl">Finale</h3>
                <div className="text-xs font-bold text-amber-900 mt-1">First to {config.finBestOf} • {config.finModus}</div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className={`font-bold text-lg flex-1 truncate ${koTeams.fin_team1.includes('Sieger') ? 'text-amber-700/60 italic' : 'text-slate-900'}`}>{koTeams.fin_team1}</span>
                  <input type="number" min="0" value={koScores.fin_1} onChange={(e) => updateKoScore('fin', 1, e.target.value)} className="w-16 h-14 text-center font-black text-2xl bg-amber-50 border-2 border-amber-400 rounded-lg focus:bg-white outline-none text-slate-900" />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className={`font-bold text-lg flex-1 truncate ${koTeams.fin_team2.includes('Sieger') ? 'text-amber-700/60 italic' : 'text-slate-900'}`}>{koTeams.fin_team2}</span>
                  <input type="number" min="0" value={koScores.fin_2} onChange={(e) => updateKoScore('fin', 2, e.target.value)} className="w-16 h-14 text-center font-black text-2xl bg-amber-50 border-2 border-amber-400 rounded-lg focus:bg-white outline-none text-slate-900" />
                </div>
              </div>
            </div>

            {turnierSieger && (
              <div className="mt-6 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 p-6 rounded-xl text-center shadow-lg border-4 border-yellow-500">
                <div className="text-sm uppercase font-black text-amber-900 tracking-widest flex justify-center items-center gap-2 mb-2">
                  <TrophyIcon /> Turniersieger
                </div>
                <div className="text-3xl font-extrabold text-amber-950 truncate drop-shadow-md">{turnierSieger}</div>
              </div>
            )}

          </div>
        </main>
      )}

    </div>
  );
}