import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Eye, EyeOff, Fingerprint, LockKeyhole, Mail, ShieldCheck, Sparkles, Camera, CameraOff } from 'lucide-react';
import './login.css';

export function LoginPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [cameraOn, setCameraOn] = useState(false);
  const [faceCaptured, setFaceCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState('');

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), []);

  function startSso(provider: 'google' | 'microsoft') {
    const url = provider === 'google' ? import.meta.env.VITE_GOOGLE_SSO_URL : import.meta.env.VITE_MICROSOFT_SSO_URL;
    if (url) window.location.assign(url);
    else setMessage(`${provider === 'google' ? 'Google' : 'Microsoft'} SSO is ready to configure. Set VITE_${provider.toUpperCase()}_SSO_URL in your environment.`);
  }

  async function startCamera() {
    setMessage(''); setFaceCaptured(false); setCapturedImage('');
    if (!navigator.mediaDevices?.getUserMedia) {
      setMessage('Camera access is not available in this browser or context. Use HTTPS or localhost.'); return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      // Mount the video element first; it is rendered only while cameraOn is true.
      setCameraOn(true);
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      const video = videoRef.current;
      if (!video) { stream.getTracks().forEach((track) => track.stop()); streamRef.current = null; setCameraOn(false); setMessage('Camera preview could not be initialized. Please try again.'); return; }
      video.srcObject = stream;
      try {
        await new Promise<void>((resolve, reject) => {
          if (video.readyState >= HTMLMediaElement.HAVE_METADATA) { resolve(); return; }
          video.onloadedmetadata = () => resolve();
          video.onerror = () => reject(new Error('Video metadata failed'));
        });
        await video.play();
        setMessage('Camera is ready. Position your face in the frame, then select Capture face.');
      } catch {
        setMessage('The camera opened, but video playback failed. Check browser permissions and try Start again.');
      }
    } catch (error) {
      const detail = error instanceof Error ? error.name : '';
      if (detail === 'NotAllowedError' || detail === 'PermissionDeniedError') setMessage('Camera permission is blocked. Click the camera icon beside the address bar, allow camera access, then select Start again.');
      else if (detail === 'NotFoundError' || detail === 'DevicesNotFoundError') setMessage('No camera was found. Connect or enable a webcam and try again.');
      else setMessage('Could not start the camera. Make sure no other app is using it and that browser camera permission is allowed.');
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false); setFaceCaptured(false); setCapturedImage('');
  }

  function captureFace() {
    const video = videoRef.current;
    if (!video || !cameraOn || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || video.videoWidth === 0 || video.videoHeight === 0) {
      setMessage('No live camera frame is available yet. Wait for the video preview, then try Capture face again.'); return;
    }
    // Capture stays in this browser; this is not identity verification.
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) { setMessage('Could not capture the camera frame. Please try again.'); return; }
    context.translate(canvas.width, 0); context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL('image/jpeg', 0.9));
    setFaceCaptured(true);
    setMessage('Photo captured in this browser. Face identity matching is not enabled yet; connect a secure, consent-based verification backend before using this for sign-in.');
  }

  function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('The login UI is ready, but authentication is not connected yet. Configure your backend auth endpoint before enabling sign-in.');
  }

  return <main className="pp-login">
    <section className="pp-login-visual">
      <div className="pp-brand"><div className="pp-brand-mark"><Sparkles size={21}/></div><span>PrepPilot</span></div>
      <div className="pp-visual-copy"><span className="pp-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h1>Make your next<br/>move <em>count.</em></h1><p>One workspace for learning, interview practice, and the career you’re building.</p>
        <div className="pp-feature-list"><div><span className="pp-feature-icon"><ShieldCheck size={19}/></span><span><b>One secure workspace</b><small>Your learning journey, all in one place</small></span></div><div><span className="pp-feature-icon"><Fingerprint size={19}/></span><span><b>Sign in your way</b><small>Password, single sign-on, or face sign-in setup</small></span></div></div>
      </div>
      <div className="pp-visual-footer"><span>PREPPILOT · CAREER GROWTH PLATFORM</span><span>Learn. Practice. Get hired.</span></div>
      <div className="pp-orb pp-orb-one"/><div className="pp-orb pp-orb-two"/>
    </section>
    <section className="pp-login-panel"><div className="pp-login-card">
      <div className="pp-mobile-brand"><div className="pp-brand-mark"><Sparkles size={19}/></div><span>PrepPilot</span></div>
      <div className="pp-form-heading"><span className="pp-welcome">WELCOME BACK</span><h2>Sign in to your account</h2><p>Pick up where you left off.</p></div>
      <div className="pp-sso-row"><button type="button" className="pp-sso-button" onClick={() => startSso('google')}><span className="pp-google-g">G</span>Google</button><button type="button" className="pp-sso-button" onClick={() => startSso('microsoft')}><span className="pp-ms-logo"><i/><i/><i/><i/></span>Microsoft</button></div>
      <div className="pp-divider"><span/>or continue with email<span/></div>
      <form className="pp-auth-form" onSubmit={submitLogin}>
        <label htmlFor="pp-email">Email address</label><div className="pp-input-wrap"><Mail size={18}/><input id="pp-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div className="pp-password-label"><label htmlFor="pp-password">Password</label><button type="button" className="pp-text-link" onClick={()=>setMessage('Connect your backend password-reset flow to enable password recovery.')}>Forgot password?</button></div>
        <div className="pp-input-wrap"><LockKeyhole size={18}/><input id="pp-password" type={showPassword?'text':'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/><button type="button" className="pp-eye" aria-label={showPassword?'Hide password':'Show password'} onClick={()=>setShowPassword(v=>!v)}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>
        <button type="submit" className="pp-submit">Sign in <ArrowRight size={18}/></button>
      </form>
      <div className="pp-face-card"><div className="pp-face-icon"><Fingerprint size={21}/></div><div className="pp-face-copy"><b>Face sign-in</b><small>Use your camera to start biometric sign-in setup</small></div>{cameraOn ? <button type="button" className="pp-face-action" onClick={stopCamera}><CameraOff size={16}/> Stop</button> : <button type="button" className="pp-face-action" onClick={startCamera}><Camera size={16}/> Start</button>}</div>
      {cameraOn && <div className="pp-camera-box"><video ref={videoRef} autoPlay muted playsInline/><div className="pp-camera-frame"/><button type="button" onClick={captureFace} className="pp-capture" disabled={faceCaptured}>{faceCaptured?'Captured':'Capture face'}</button></div>}
      {capturedImage && <div className="pp-captured-preview"><img src={capturedImage} alt="Captured face preview"/><span>Captured photo preview</span><button type="button" onClick={() => { setCapturedImage(''); setFaceCaptured(false); setMessage('Ready to capture again.'); }}>Retake</button></div>}
      {message && <div className="pp-message" role="status">{message}</div>}
      <p className="pp-terms">By continuing, you agree to our <a href="#terms" onClick={e=>{e.preventDefault();setMessage('Add your Terms of Service URL here.')}}>Terms</a> and <a href="#privacy" onClick={e=>{e.preventDefault();setMessage('Add your Privacy Policy URL here.')}}>Privacy Policy</a>.</p>
      <div className="pp-security-note"><ShieldCheck size={15}/> Your sign-in options are protected by your organization’s authentication setup.</div>
      <button className="pp-back-home" onClick={()=>navigate('/')} type="button">← Back to home</button>
    </div></section>
  </main>;
}
