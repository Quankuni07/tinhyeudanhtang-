(() => {
  // ====== SỬA Ở ĐÂY ĐỂ CÁ NHÂN HÓA ======
  const CONFIG = {
    to: 'bạn Ngọc',                        // hiện ở "Gửi ..."
    fullName: 'Nguyễn Thị Hồng Ngọc',      // tên trong trái tim nhỏ
    from: 'Tên của bạn',                   // tên bạn (ký cuối thư)
    plate: 'Gửi bạn Ngọc',                 // chữ dưới khung
    startDate: '2026-10-01',               // ngày quen/để ý (để '' nếu không muốn đếm ngày)
    daysLabel: 'ngày mình biết bạn',
    song: {
      title: 'Mình Yêu Nhau Đi',
      artist: 'Bích Phương',
      file: 'minh-yeu-nhau-di.mp3',
      youtubeId: 'X8mhF6HgzVA'
    },
    // Danh sách gợi ý cạnh thẻ nhạc.
    // Bài có `id` (mã video YouTube) sẽ phát ngay trong trang; bài chưa có `id` sẽ mở tìm kiếm YouTube.
    // Muốn bài nào phát được: dán cả link YouTube (hoặc chỉ mã 11 ký tự sau v=) vào `id`.
    playlist: [
      { title: '4 Mùa Yêu Em', artist: '', id: '0L7SpBaJtkI' },
      { title: 'Như Anh Đã Thấy Em', artist: 'PhucXp ft. Freak D', id: 'cPbp2iFaZRo' },
      { title: 'Dịu Dàng Em Đến', artist: 'ERIK, NINJA Z', id: 'LbANX0zTlDk' },
      { title: 'Thích Em Hơi Nhiều', artist: 'Wren Evans', id: 'faSVTByG0LQ' },
      { title: 'Mình Yêu Nhau Đi', artist: 'Bích Phương', id: 'X8mhF6HgzVA' }
    ],
    ticker: [                              // dải chữ chạy phía dưới
      'Gửi bạn Ngọc',
      'Mong bạn luôn vui',
      'Hôm nay bạn cười chưa?',
      'Có một người đang nghĩ về bạn',
      'Cảm ơn vì bạn đã xuất hiện'
    ],
    // Các dòng ghi chú bên trái: SỬA thành điều thật về Ngọc nhé (tối đa 5 dòng cho đẹp)
    reasons: [
      'Nụ cười của bạn làm mình vui cả ngày',
      'Cách bạn quan tâm mọi người xung quanh',
      'Giọng nói dịu dàng của bạn',
      'Ở cạnh bạn mình thấy bình yên'
    ],
    message:
      'Mình không giỏi nói lời hay, nên mình làm trái tim này để nói thay mình.\n\n' +
      'Mỗi lần thấy bạn cười, một ngày của mình bỗng dịu dàng hơn hẳn.\n\n' +
      'Mình thích bạn. Bạn không cần trả lời ngay đâu, chỉ cần biết là có một người đang thích bạn thật lòng.'
  };
  // =====================================

  const $ = (id) => document.getElementById(id);
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PAL = ['#ff8fc0', '#ffb3d6', '#c9a8ff', '#9fd4ff', '#ffe28a', '#a8ecd6'];

  // ===== Văn bản =====
  $('plate').textContent = CONFIG.plate;
  $('to').textContent = `Gửi ${CONFIG.to},`;
  $('envTo').textContent = `Gửi ${CONFIG.to}`;
  if (CONFIG.startDate) {
    const d = Math.max(0, Math.floor((Date.now() - new Date(CONFIG.startDate)) / 86400000));
    $('days').textContent = `♥ ${d} ${CONFIG.daysLabel} ♥`;
  }

  // ===== Ghi chú bên trái =====
  const list = $('reasons');
  CONFIG.reasons.forEach((text, i) => {
    const li = document.createElement('li');
    li.style.setProperty('--i', i);
    li.textContent = text;
    list.appendChild(li);
  });

  // ===== Thẻ nhạc + dải chữ chạy + dây đèn =====
  $('songTitle').textContent = CONFIG.song.title;
  $('songArtist').textContent = CONFIG.song.artist;

  const track = $('tickerTrack');
  for (let g = 0; g < 2; g++) {
    for (let r = 0; r < 3; r++) {
      CONFIG.ticker.forEach((text) => {
        const a = document.createElement('span');
        a.textContent = text;
        const b = document.createElement('span');
        b.className = 'dot';
        b.textContent = '♥';
        track.append(a, b);
      });
    }
  }

  const lightsEl = $('lights');
  const NS = 'http://www.w3.org/2000/svg';
  function drawLights() {
    const w = innerWidth;
    const n = Math.max(5, Math.round(w / 110));
    const step = w / n;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', w);
    svg.setAttribute('height', 80);
    let d = '';
    let k = 0;
    for (let i = 0; i < n; i++) {
      const x0 = i * step;
      const x1 = x0 + step;
      const xm = (x0 + x1) / 2;
      d += `M${x0},6 Q${xm},46 ${x1},6 `;
      for (const t of [0.2, 0.5, 0.8]) {
        const u = 1 - t;
        const bx = u * u * x0 + 2 * u * t * xm + t * t * x1;
        const by = u * u * 6 + 2 * u * t * 46 + t * t * 6;
        const bulb = document.createElementNS(NS, 'ellipse');
        bulb.setAttribute('cx', bx);
        bulb.setAttribute('cy', by + 11);
        bulb.setAttribute('rx', 5);
        bulb.setAttribute('ry', 7);
        bulb.setAttribute('class', 'bulb');
        bulb.style.setProperty('--c', PAL[k % PAL.length]);
        bulb.style.animationDelay = -(k * 0.37) + 's';
        const stem = document.createElementNS(NS, 'line');
        stem.setAttribute('x1', bx); stem.setAttribute('y1', by);
        stem.setAttribute('x2', bx); stem.setAttribute('y2', by + 5);
        stem.setAttribute('class', 'wire');
        svg.append(stem, bulb);
        k++;
      }
    }
    const wire = document.createElementNS(NS, 'path');
    wire.setAttribute('d', d);
    wire.setAttribute('class', 'wire');
    svg.prepend(wire);
    lightsEl.replaceChildren(svg);
  }
  drawLights();
  window.addEventListener('resize', drawLights);

  // ===== Phát nhạc thật =====
  const musicCard = $('music');
  const barFill = $('barFill');
  const playBtn = $('playBtn');
  const queueStatus = $('queueStatus');
  const audio = new Audio();
  audio.preload = 'auto';
  let mode = 'file';          // 'file' | 'yt' | 'none'
  let ytPlayer = null;
  let ytReady = false;
  let wantPlay = false;
  let localTracks = [];
  let localTrackIndex = -1;
  let activeYTIndex = CONFIG.playlist.findIndex(
    (item) => normalizeYT(item.id) === CONFIG.song.youtubeId
  );

  function normalizeYT(value) {
    const m = (value || '').match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : (value || '');
  }

  function setPlaying(on) {
    musicCard.classList.toggle('playing', on);
    playBtn.textContent = on ? '❚❚ Tạm dừng' : '▶ Phát nhạc';
  }

  function initYT() {
    const id = CONFIG.song.youtubeId;
    if (!id) {
      mode = 'none';
      musicCard.classList.add('no-audio');
      return;
    }
    mode = 'yt';
    const holder = document.createElement('div');
    holder.id = 'ytPlayer';
    holder.style.cssText = 'position:fixed;left:-10px;top:-10px;width:1px;height:1px;opacity:0;pointer-events:none';
    document.body.appendChild(holder);
    const boot = () => {
      ytPlayer = new YT.Player('ytPlayer', {
        width: '1',
        height: '1',
        videoId: id,
        playerVars: { playsinline: 1, controls: 0 },
        events: {
          onReady: () => { ytReady = true; if (wantPlay) ytPlayer.playVideo(); },
          onStateChange: (e) => {
            setPlaying(e.data === 1);
            if (e.data === 0) playNextYT();
          }
        }
      });
    };
    if (window.YT && window.YT.Player) {
      boot();
    } else {
      window.onYouTubeIframeAPIReady = boot;
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    }
    setInterval(() => {
      if (mode === 'yt' && ytReady && ytPlayer.getDuration && ytPlayer.getDuration() > 0) {
        barFill.style.width = (ytPlayer.getCurrentTime() / ytPlayer.getDuration()) * 100 + '%';
      }
    }, 500);
  }

  audio.addEventListener('error', () => {
    if (mode !== 'file') return;
    if (localTrackIndex >= 0) {
      queueStatus.textContent = 'Không phát được bài hát đã chọn.';
      if (localTrackIndex + 1 < localTracks.length) playLocalTrack(localTrackIndex + 1);
      else setPlaying(false);
      return;
    }
    initYT();
  });
  audio.addEventListener('play', () => setPlaying(true));
  audio.addEventListener('pause', () => setPlaying(false));
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) barFill.style.width = (audio.currentTime / audio.duration) * 100 + '%';
  });
  audio.addEventListener('ended', () => {
    if (localTrackIndex >= 0 && localTrackIndex + 1 < localTracks.length) {
      playLocalTrack(localTrackIndex + 1);
    } else if (localTrackIndex < 0 && localTracks.length) {
      playLocalTrack(0);
    } else {
      setPlaying(false);
    }
  });
  audio.src = CONFIG.song.file;

  function playMusic() {
    wantPlay = true;
    if (mode === 'file') {
      audio.play().catch(() => {
        setPlaying(false);
        queueStatus.textContent = 'Trình duyệt không thể phát bài hát này.';
      });
    }
    else if (mode === 'yt' && ytReady) ytPlayer.playVideo();
  }
  function pauseMusic() {
    wantPlay = false;
    if (mode === 'file') audio.pause();
    else if (mode === 'yt' && ytReady) ytPlayer.pauseVideo();
  }
  function toggleMusic() {
    if (musicCard.classList.contains('playing')) pauseMusic(); else playMusic();
  }
  playBtn.addEventListener('click', toggleMusic);
  $('vinyl').addEventListener('click', toggleMusic);
  $('vinyl').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMusic(); }
  });


  // Phát một video YouTube theo mã
  function loadYT(id, playlistIndex = -1) {
    audio.pause();
    localTrackIndex = -1;
    CONFIG.song.youtubeId = id;
    activeYTIndex = playlistIndex >= 0
      ? playlistIndex
      : CONFIG.playlist.findIndex((item) => normalizeYT(item.id) === id);
    musicCard.classList.remove('no-audio');
    wantPlay = true;
    if (ytPlayer && ytReady) { mode = 'yt'; ytPlayer.loadVideoById(id); }
    else initYT();
    markActive(id);
  }

  function playLocalTrack(index) {
    const track = localTracks[index];
    if (!track) return;
    if (mode === 'yt' && ytReady) ytPlayer.pauseVideo();
    localTrackIndex = index;
    mode = 'file';
    $('songTitle').textContent = track.title;
    $('songArtist').textContent = 'Từ thiết bị của bạn';
    audio.src = track.url;
    barFill.style.width = '0%';
    musicCard.classList.remove('no-audio');
    playMusic();
    plList.querySelectorAll('.pl-row').forEach((row) => {
      row.classList.toggle('active', Number(row.dataset.localIndex) === index);
    });
  }

  function playNextYT() {
    const nextIndex = CONFIG.playlist.findIndex((item, index) =>
      index > activeYTIndex && !!normalizeYT(item.id)
    );
    if (nextIndex >= 0) {
      const item = CONFIG.playlist[nextIndex];
      $('songTitle').textContent = item.title;
      $('songArtist').textContent = item.artist || CONFIG.song.artist;
      loadYT(normalizeYT(item.id), nextIndex);
    } else if (localTracks.length) {
      playLocalTrack(0);
    } else {
      setPlaying(false);
    }
  }

  // ===== Danh sách gợi ý cạnh thẻ nhạc =====
  const plList = $('plList');
  function markActive(id) {
    plList.querySelectorAll('.pl-row').forEach((row) => {
      row.classList.toggle('active', !!id && row.dataset.id === id);
    });
  }
  // Cho phép dán cả link YouTube hoặc chỉ mã video
  CONFIG.playlist.forEach((item) => {
    const vid = normalizeYT(item.id);
    const li = document.createElement('li');
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'pl-row';
    row.dataset.id = vid;
    const icon = document.createElement('span');
    icon.className = 'pl-icon';
    icon.textContent = vid ? '▶' : '↗';
    const text = document.createElement('span');
    text.className = 'pl-text';
    const name = document.createElement('span');
    name.className = 'pl-name';
    name.textContent = item.title;
    text.appendChild(name);
    if (item.artist) {
      const by = document.createElement('span');
      by.className = 'pl-by';
      by.textContent = item.artist;
      text.appendChild(by);
    }
    row.append(icon, text);
    row.addEventListener('click', () => {
      if (vid) {
        $('songTitle').textContent = item.title;
        $('songArtist').textContent = item.artist || CONFIG.song.artist;
        loadYT(vid, CONFIG.playlist.indexOf(item));
      } else {
        const q = encodeURIComponent(`${item.title} ${item.artist}`.trim());
        window.open('https://www.youtube.com/results?search_query=' + q, '_blank', 'noopener');
      }
    });
    li.appendChild(row);
    plList.appendChild(li);
  });
  markActive(CONFIG.song.youtubeId);

  // Chọn file nhạc trên máy (để thử ngay, không cần đặt tên music.mp3)
  $('pickFile').addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|aac|flac|webm)$/i.test(file.name)
    );
    if (!files.length) return;

    localTracks.forEach((track) => URL.revokeObjectURL(track.url));
    localTracks = files.map((file) => ({
      title: file.name.replace(/\.[^.]+$/, ''),
      url: URL.createObjectURL(file)
    }));
    plList.querySelectorAll('.pl-local').forEach((row) => row.remove());
    localTracks.forEach((track, index) => {
      const li = document.createElement('li');
      li.className = 'pl-local';
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'pl-row';
      row.dataset.localIndex = index;
      const icon = document.createElement('span');
      icon.className = 'pl-icon';
      icon.textContent = '▶';
      const text = document.createElement('span');
      text.className = 'pl-text';
      const name = document.createElement('span');
      name.className = 'pl-name';
      name.textContent = track.title;
      text.appendChild(name);
      row.append(icon, text);
      row.addEventListener('click', () => playLocalTrack(index));
      li.appendChild(row);
      plList.appendChild(li);
    });
    queueStatus.textContent = `${localTracks.length} bài hát đã sẵn sàng phát lần lượt.`;
    e.target.value = '';
    playLocalTrack(0);
  });

  // Dán link YouTube rồi nhấn Enter
  $('ytLink').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const id = normalizeYT(e.target.value.trim());
    if (!id) {
      e.target.value = '';
      e.target.placeholder = 'Link chưa đúng, thử lại nhé';
      return;
    }
    loadYT(id);
  });

  // ===== Hiệu ứng nền =====
  const starsEl = $('stars');
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('i');
    s.className = 'star';
    s.style.left = rand(0, 100) + '%';
    s.style.top = rand(0, 100) + '%';
    s.style.setProperty('--s', rand(2, 4.5) + 'px');
    s.style.setProperty('--d', rand(2.5, 6.5) + 's');
    s.style.setProperty('--dl', -rand(0, 6) + 's');
    s.style.setProperty('--c', pick(['#ffffff', '#fff1a8', '#ffd6ec', '#dcd0ff']));
    starsEl.appendChild(s);
  }

  function sparkle(x, y, chars, minSize, maxSize, spread, dur) {
    const el = document.createElement('span');
    el.className = 'spark';
    el.textContent = pick(chars);
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.color = pick(PAL);
    el.style.fontSize = rand(minSize, maxSize) + 'px';
    el.style.animationDuration = dur * rand(0.7, 1.3) + 's';
    el.style.setProperty('--sx', (Math.random() - 0.5) * spread + 'px');
    el.style.setProperty('--sy', (Math.random() - 0.3) * spread + 'px');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1400);
  }

  function confetti() {
    for (let i = 0; i < 46; i++) {
      sparkle(innerWidth / 2, innerHeight / 2, ['♥', '♥', '✦', '✧', '❀'], 14, 30, Math.min(innerWidth, 700), 1.6);
    }
  }

  if (!reduce) {
    const petals = $('petals');
    setInterval(() => {
      if (document.hidden) return;
      const p = document.createElement('span');
      p.className = 'petal';
      p.textContent = pick(['♥', '♥', '❀', '✦']);
      p.style.left = rand(0, 100) + 'vw';
      p.style.fontSize = rand(10, 26) + 'px';
      p.style.color = pick(PAL);
      p.style.opacity = rand(0.5, 0.9);
      p.style.animationDuration = rand(8, 15) + 's';
      p.style.setProperty('--dx', rand(-60, 60) + 'px');
      p.style.setProperty('--rot', rand(-60, 60) + 'deg');
      petals.appendChild(p);
      setTimeout(() => p.remove(), 16000);
    }, 650);

    const shoot = () => {
      if (!document.hidden) {
        const s = document.createElement('i');
        s.className = 'shoot';
        s.style.left = rand(0, 70) + 'vw';
        s.style.top = rand(0, 40) + 'vh';
        starsEl.appendChild(s);
        setTimeout(() => s.remove(), 1400);
      }
      setTimeout(shoot, rand(3500, 7500));
    };
    setTimeout(shoot, 2500);

    let last = 0;
    window.addEventListener('pointermove', (e) => {
      const n = performance.now();
      if (n - last < 45) return;
      last = n;
      sparkle(e.clientX, e.clientY, ['✦', '✧', '♥'], 8, 15, 50, 0.9);
    });
  }

  // ===== Phong thư =====
  const envScreen = $('envelopeScreen');
  const env = $('env');
  function openEnvelope() {
    if (env.classList.contains('open')) return;
    env.classList.add('open');
    playMusic(); // bấm mở thư là một cử chỉ của người dùng nên trình duyệt cho phép phát nhạc
    setTimeout(confetti, reduce ? 0 : 900);
    setTimeout(() => {
      document.body.classList.add('opened');
      envScreen.classList.add('gone');
    }, reduce ? 200 : 2000);
    setTimeout(() => envScreen.remove(), 3600);
  }
  env.addEventListener('click', openEnvelope);
  env.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
  });

  // ===== Lá thư gõ chữ =====
  const msgEl = $('msg');
  const fromEl = $('from');
  let typed = false;
  function typeLetter() {
    if (typed) return;
    typed = true;
    const chars = Array.from(CONFIG.message.normalize('NFC'));
    const finish = () => { msgEl.classList.remove('caret'); fromEl.textContent = '— ' + CONFIG.from; };
    if (reduce) { msgEl.textContent = chars.join(''); finish(); return; }
    msgEl.classList.add('caret');
    let i = 0;
    const timer = setInterval(() => {
      i++;
      msgEl.textContent = chars.slice(0, i).join('');
      if (i >= chars.length) { clearInterval(timer); finish(); }
    }, 45);
  }

  // ===== Trái tim trên canvas =====
  const stage = $('stage');
  const frameEl = $('frame');
  const cv = $('heart');
  const ctx = cv.getContext('2d');
  const N_OUT = 700;
  const N_FILL = 1100;
  const YC = -6;
  const HALF = 17;
  const t0 = performance.now();
  let W = 0, H = 0, dpr = 1, parts = [], bursts = [], glints = [];

  const curve = (t) => {
    const s = Math.sin(t);
    return {
      x: 16 * s * s * s,
      y: 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    };
  };

  const beat = (time) => {
    const ph = (time * 1.2) % 1;
    return Math.exp(-Math.pow((ph - 0.05) / 0.05, 2)) * 0.8 + Math.exp(-Math.pow((ph - 0.22) / 0.06, 2)) * 0.5;
  };

  function initParts() {
    parts = [];
    for (let i = 0; i < N_OUT; i++) {
      parts.push({ o: true, t: (Math.PI * 2 * i) / N_OUT, size: rand(1.4, 2.4), ph: rand(0, 6.28) });
    }
    for (let i = 0; i < N_FILL; i++) {
      parts.push({ o: false, t: rand(0, 6.28), r: Math.sqrt(Math.random()) * 0.92, size: rand(0.7, 2.0), hue: rand(300, 345), ph: rand(0, 6.28) });
    }
    glints = Array.from({ length: 16 }, () => ({ i: Math.floor(Math.random() * N_OUT), ph: rand(0, 6.28) }));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth;
    H = cv.clientHeight;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParts();
  }

  function spawnBurst(x, y) {
    for (let i = 0; i < 40; i++) {
      const a = rand(0, 6.28);
      const v = rand(0.6, 2.8);
      bursts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 0.6, life: 1, decay: rand(0.012, 0.024), size: rand(1.8, 3.6), hue: rand(300, 350) });
    }
  }

  // Cuốn sách mở ra ở dưới trái tim
  function drawBook(cx, top, w, time) {
    const h = w * 0.34;
    const flutter = reduce ? 0 : Math.sin(time * 1.6) * h * 0.03;
    const pagePath = (sign) => {
      const p = new Path2D();
      p.moveTo(cx, top + h * 0.06);
      p.quadraticCurveTo(cx + sign * w * 0.25, top - h * 0.2 + flutter, cx + sign * w * 0.5, top - h * 0.08);
      p.lineTo(cx + sign * w * 0.5, top + h * 0.72);
      p.quadraticCurveTo(cx + sign * w * 0.25, top + h * 0.55, cx, top + h * 0.86);
      p.closePath();
      return p;
    };

    ctx.save();
    const beam = ctx.createRadialGradient(cx, top, 0, cx, top, w * 0.6);
    beam.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    beam.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = beam;
    ctx.fillRect(cx - w, top - w, w * 2, w * 1.3);

    ctx.fillStyle = 'rgba(120, 60, 150, 0.22)';
    ctx.beginPath();
    ctx.ellipse(cx, top + h * 1.0, w * 0.55, h * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    const cover = new Path2D();
    cover.moveTo(cx - w * 0.54, top - h * 0.02);
    cover.lineTo(cx - w * 0.54, top + h * 0.82);
    cover.quadraticCurveTo(cx - w * 0.27, top + h * 0.66, cx, top + h * 0.95);
    cover.quadraticCurveTo(cx + w * 0.27, top + h * 0.66, cx + w * 0.54, top + h * 0.82);
    cover.lineTo(cx + w * 0.54, top - h * 0.02);
    cover.quadraticCurveTo(cx + w * 0.27, top - h * 0.28, cx, top);
    cover.closePath();
    const cg = ctx.createLinearGradient(cx - w / 2, top, cx + w / 2, top + h);
    cg.addColorStop(0, '#9b7ff0');
    cg.addColorStop(1, '#ff8fc0');
    ctx.fillStyle = cg;
    ctx.fill(cover);
    ctx.strokeStyle = 'rgba(255, 245, 200, 0.95)';
    ctx.lineWidth = 1.4;
    ctx.stroke(cover);

    for (const sign of [-1, 1]) {
      const path = pagePath(sign);
      const pg = ctx.createLinearGradient(cx + sign * w * 0.5, 0, cx, 0);
      pg.addColorStop(0, '#fffaf2');
      pg.addColorStop(1, '#eadcff');
      ctx.fillStyle = pg;
      ctx.fill(path);
      ctx.save();
      ctx.clip(path);
      ctx.strokeStyle = 'rgba(150, 110, 180, 0.35)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const y = top + h * (0.14 + i * 0.1);
        ctx.beginPath();
        ctx.moveTo(cx + sign * w * 0.07, y + h * 0.08);
        ctx.lineTo(cx + sign * w * 0.44, y - h * 0.01);
        ctx.stroke();
      }
      ctx.restore();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.stroke(path);
    }

    ctx.strokeStyle = 'rgba(150, 100, 170, 0.5)';
    ctx.beginPath();
    ctx.moveTo(cx, top + h * 0.06);
    ctx.lineTo(cx, top + h * 0.86);
    ctx.stroke();
    ctx.restore();
  }

  // Trái tim nhỏ ghi tên nằm giữa trái tim lớn
  function drawNameHeart(cx, cy, s, sc, time) {
    const k = 0.43;
    const off = -2.5 * (1 - k);
    const mid = cy - 3.5 * s * sc;
    const pt = (t) => {
      const c = curve(t);
      return { x: cx + c.x * k * s * sc, y: cy - (c.y * k + off - YC) * s * sc };
    };

    ctx.save();
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) {
      const p = pt((i / 120) * Math.PI * 2);
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    const bg = ctx.createRadialGradient(cx, mid, 0, cx, mid, s * k * 18);
    bg.addColorStop(0, 'rgba(255, 255, 255, 0.97)');
    bg.addColorStop(1, 'rgba(255, 205, 228, 0.97)');
    ctx.fillStyle = bg;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255, 120, 180, 0.9)';
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.restore();

    const words = CONFIG.fullName.normalize('NFC').split(' ');
    const line2 = words.slice(-2).join(' ');
    const line1 = words.slice(0, -2).join(' ');
    const fs = Math.max(9, s * 2.05 * sc);
    ctx.save();
    ctx.font = `700 ${fs}px "Dancing Script", cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#a2306f';
    // Hai dòng nằm đối xứng quanh tâm; nhích lên một chút vì đáy trái tim thon nhỏ lại
    const ty = mid - fs * 0.2;
    ctx.fillText(line1, cx, ty - fs * 0.55);
    ctx.fillText(line2, cx, ty + fs * 0.55);
    ctx.restore();
  }

  function drawHeart(now) {
    const time = (now - t0) / 1000;
    const pulse = reduce ? 0 : beat(time);
    const sc = 1 + 0.06 * pulse;
    const s = (Math.min(W, H) * 0.33) / HALF;
    const cx = W / 2;
    const cy = H * 0.42;

    ctx.clearRect(0, 0, W, H);

    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 21 * sc);
    halo.addColorStop(0, `rgba(255, 90, 165, ${(0.5 + 0.2 * pulse).toFixed(3)})`);
    halo.addColorStop(0.6, 'rgba(255, 150, 205, 0.18)');
    halo.addColorStop(1, 'rgba(255, 150, 205, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, s * 21 * sc, 0, Math.PI * 2);
    ctx.fill();

    drawBook(cx, cy + 11 * s + s * 1.4, W * 0.66, time);

    for (const p of parts) {
      const c = curve(p.t);
      const r = p.o ? 1 : p.r;
      const wob = reduce ? 0 : (p.o ? 0.6 : 1.2);
      const px = cx + c.x * r * s * sc + Math.sin(time * (p.o ? 1.5 : 0.8) + p.ph) * wob;
      const py = cy - (c.y * r - YC) * s * sc + Math.cos(time * (p.o ? 1.3 : 0.7) + p.ph) * wob;
      if (p.o) {
        ctx.fillStyle = `hsla(${(335 + 12 * Math.sin(time * 0.5 + p.ph * 0.2)).toFixed(1)}, 100%, 93%, 0.95)`;
      } else {
        const tw = reduce ? 0.6 : 0.4 + 0.4 * Math.sin(time * 2 + p.ph);
        ctx.fillStyle = `hsla(${p.hue.toFixed(0)}, 100%, 95%, ${tw.toFixed(3)})`;
      }
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      if (!reduce) {
        b.x += b.vx; b.y += b.vy;
        b.vx *= 0.98; b.vy = b.vy * 0.98 + 0.02;
        b.life -= b.decay;
      }
      if (b.life <= 0) { bursts.splice(i, 1); continue; }
      ctx.fillStyle = `hsla(${b.hue.toFixed(0)}, 100%, 88%, ${b.life.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size * b.life + 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduce) {
      for (const gl of glints) {
        const p = parts[gl.i];
        if (!p) continue;
        const k = Math.pow(Math.max(0, Math.sin(time * 1.8 + gl.ph)), 8);
        if (k < 0.05) continue;
        const c = curve(p.t);
        const gx = cx + c.x * s * sc;
        const gy = cy - (c.y - YC) * s * sc;
        const r = 4 + 12 * k;
        ctx.strokeStyle = `rgba(255, 255, 255, ${k.toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(gx - r, gy); ctx.lineTo(gx + r, gy);
        ctx.moveTo(gx, gy - r); ctx.lineTo(gx, gy + r);
        ctx.stroke();
        ctx.fillStyle = `rgba(255, 244, 190, ${k.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(gx, gy, r * 0.28, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    drawNameHeart(cx, cy, s, sc, time);
  }

  // ===== Xoay khung bằng kéo thả =====
  const rot = { x: 0, y: 0, vx: 0, vy: 0 };
  let sway = 1;
  let drag = null;

  function animate(now) {
    const t = (now - t0) / 1000;
    if (!drag && !reduce) {
      const ty = Math.round(rot.y / 360) * 360;
      rot.vy = (rot.vy + (ty - rot.y) * 0.004) * 0.93;
      rot.y += rot.vy;
      rot.vx = (rot.vx - rot.x * 0.004) * 0.93;
      rot.x += rot.vx;
    } else if (reduce) { rot.vx = 0; rot.vy = 0; }

    sway += ((drag || reduce ? 0 : 1) - sway) * 0.05;
    const ax = rot.x + Math.cos(t * 0.5) * 2 * sway;
    const ay = rot.y + Math.sin(t * 0.6) * 3 * sway;
    if (Math.cos((ay * Math.PI) / 180) < -0.3) typeLetter();
    frameEl.style.transform = `rotateX(${ax.toFixed(2)}deg) rotateY(${ay.toFixed(2)}deg)`;

    drawHeart(now);
    requestAnimationFrame(animate);
  }

  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag = { id: e.pointerId, lx: e.clientX, ly: e.clientY, moved: 0, target: e.target };
    rot.vx = 0; rot.vy = 0;
  });

  window.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.lx;
    const dy = e.clientY - drag.ly;
    drag.lx = e.clientX; drag.ly = e.clientY;
    drag.moved += Math.abs(dx) + Math.abs(dy);
    rot.y += dx * 0.35;
    rot.x = clamp(rot.x - dy * 0.3, -45, 45);
    rot.vy = dx * 0.35;
    rot.vx = -dy * 0.3;
  });

  function endPointer(e) {
    if (!drag || e.pointerId !== drag.id) return;
    if (drag.moved < 6 && drag.target === cv && e.target === cv) {
      spawnBurst(e.offsetX, e.offsetY);
      if (!reduce) for (let i = 0; i < 14; i++) sparkle(e.clientX, e.clientY, ['✦', '♥', '✧'], 10, 22, 170, 1.2);
    }
    drag = null;
  }
  window.addEventListener('pointerup', endPointer);
  window.addEventListener('pointercancel', endPointer);

  cv.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); spawnBurst(W / 2, H / 2); }
    else if (e.key === 'ArrowLeft') rot.vy -= 3;
    else if (e.key === 'ArrowRight') rot.vy += 3;
    else if (e.key === 'ArrowUp') rot.vx += 2;
    else if (e.key === 'ArrowDown') rot.vx -= 2;
  });

  new ResizeObserver(resize).observe(cv);
  resize();
  requestAnimationFrame(animate);
})();
