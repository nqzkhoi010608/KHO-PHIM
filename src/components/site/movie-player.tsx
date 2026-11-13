'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Check, ChevronLeft, ChevronRight, Maximize, Pause, Play, Settings, Volume2, VolumeX } from 'lucide-react';
import type { Episode, Movie } from '@/types/catalog';

type Props = { movie: Movie; episode: Episode; nextEpisode?: Episode; previousEpisode?: Episode };

export function MoviePlayer({ movie, episode, nextEpisode, previousEpisode }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [autoNext, setAutoNext] = useState(true);
  const demoUrl = useMemo(() => 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', []);

  useEffect(() => { const video = videoRef.current; if (!video) return; let lastSaved = 0; const saveProgress = () => { const secondsWatched = Math.floor(video.currentTime); if (secondsWatched === 0 || secondsWatched - lastSaved < 15) return; lastSaved = secondsWatched; void fetch('/api/watch-progress', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ movieId: movie.id, episodeNumber: episode.number, secondsWatched, durationSeconds: Number.isFinite(video.duration) ? Math.floor(video.duration) : undefined }) }); }; const onTime = () => { setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0); saveProgress(); }; const onPause = () => saveProgress(); const onEnd = () => { saveProgress(); if (autoNext && nextEpisode) router.push(`/xem-phim/${movie.slug}/${nextEpisode.number}`); }; video.addEventListener('timeupdate', onTime); video.addEventListener('pause', onPause); video.addEventListener('ended', onEnd); return () => { video.removeEventListener('timeupdate', onTime); video.removeEventListener('pause', onPause); video.removeEventListener('ended', onEnd); }; }, [autoNext, episode.number, movie.id, movie.slug, nextEpisode, router]);

  function togglePlay() { const video = videoRef.current; if (!video) return; if (video.paused) { void video.play().then(() => setPlaying(true)).catch(() => setError(true)); } else { video.pause(); setPlaying(false); } }
  function toggleMute() { const video = videoRef.current; if (!video) return; video.muted = !video.muted; setMuted(video.muted); }
  function fullscreen() { void videoRef.current?.requestFullscreen?.(); }

  return <div className="overflow-hidden border border-line bg-black"><div className="relative aspect-video"><video ref={videoRef} className="h-full w-full object-contain" poster={movie.backdropUrl} src={demoUrl} onError={() => setError(true)} playsInline preload="metadata" aria-label={`Trình phát ${movie.title}, ${episode.title}`} />{error && <div className="absolute inset-0 grid place-items-center bg-[#0b0d0e]/95 p-6 text-center"><div className="max-w-sm"><AlertTriangle className="mx-auto text-signal" size={30} /><p className="mt-4 font-medium text-paper">Nguồn phát đang tạm thời không khả dụng</p><p className="mt-2 text-sm leading-6 text-muted">Bạn có thể thử lại sau hoặc chuyển sang tập khác. Nguồn gốc video không được hiển thị trong giao diện.</p><button onClick={() => { setError(false); void videoRef.current?.load(); }} className="btn btn-quiet mt-5">Thử lại</button></div></div>}<div className="absolute inset-x-0 bottom-0 bg-[#080a0c]/90 px-4 pb-3 pt-2"><div className="h-1 bg-white/20"><div className="h-full bg-signal transition-[width]" style={{ width: `${progress}%` }} /></div><div className="mt-3 flex items-center gap-4"><button onClick={togglePlay} className="text-paper" aria-label={playing ? 'Tạm dừng' : 'Phát'}>{playing ? <Pause size={19} /> : <Play size={19} fill="currentColor" />}</button><button onClick={toggleMute} className="text-paper" aria-label={muted ? 'Bật âm lượng' : 'Tắt âm lượng'}>{muted ? <VolumeX size={19} /> : <Volume2 size={19} />}</button><span className="text-xs text-muted">{episode.title}</span><div className="ml-auto flex items-center gap-4"><label className="hidden items-center gap-2 text-xs text-muted sm:flex"><input type="checkbox" checked={autoNext} onChange={(event) => setAutoNext(event.target.checked)} className="accent-signal" /> Tự chuyển tập</label><button className="text-paper" aria-label="Cài đặt"><Settings size={18} /></button><button onClick={fullscreen} className="text-paper" aria-label="Toàn màn hình"><Maximize size={18} /></button></div></div></div></div></div>;
}

export function EpisodeNav({ movie, episode, previousEpisode, nextEpisode }: Props) {
  return <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><div className="flex gap-2">{previousEpisode ? <a href={`/xem-phim/${movie.slug}/${previousEpisode.number}`} className="btn btn-quiet px-3"><ChevronLeft size={17} /> Tập trước</a> : <span className="btn cursor-not-allowed border-line bg-panel px-3 text-muted opacity-50"><ChevronLeft size={17} /> Tập trước</span>}{nextEpisode ? <a href={`/xem-phim/${movie.slug}/${nextEpisode.number}`} className="btn btn-quiet px-3">Tập sau <ChevronRight size={17} /></a> : <span className="btn cursor-not-allowed border-line bg-panel px-3 text-muted opacity-50">Tập sau <ChevronRight size={17} /></span>}</div><span className="flex items-center gap-2 text-xs text-muted"><Check size={14} className="text-signal" /> Tiến độ chỉ lưu lâu dài khi bạn đăng nhập</span></div>;
}
