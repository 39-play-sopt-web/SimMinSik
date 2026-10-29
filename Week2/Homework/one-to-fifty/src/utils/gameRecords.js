const STORAGE_KEY = 'one-to-fifty-records';

export function clearGameRecords() {
  localStorage.removeItem(STORAGE_KEY);
}

export function loadGameRecords() {
  const savedRecords = localStorage.getItem(STORAGE_KEY);
  if (!savedRecords) return [];

  const records = JSON.parse(savedRecords);
  if (!Array.isArray(records)) throw new Error('게임 기록 형식 오류');
  return records;
}

export function saveGameRecord(level, playTime) {
  const record = {
    id: crypto.randomUUID(),
    playedAt: new Date().toISOString(),
    level,
    playTime,
  };

  const records = loadGameRecords();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...records, record]));
  return record;
}
