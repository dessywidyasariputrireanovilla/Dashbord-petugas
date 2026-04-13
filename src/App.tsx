import React from 'react';
import {
  Search, Bell, Asterisk, UserCircle, LayoutDashboard, Activity,
  TrendingUp, ClipboardList, AlertTriangle, Plus, Settings, HelpCircle,
  User, Clipboard, Heart, Gauge, Wind, Clock, Info, CheckCircle2,
  PlusSquare
} from 'lucide-react';

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all ${
      active 
        ? 'bg-white text-primary shadow-sm translate-x-1' 
        : 'text-slate-600 hover:text-primary hover:bg-primary/5'
    }`}>
      {icon}
      <span className={active ? 'font-semibold' : ''}>{label}</span>
    </a>
  );
}

function VitalInput({ label, icon, value }: { label: string, icon: React.ReactNode, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold text-on-surface-variant uppercase pl-1">{label}</label>
      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-transparent focus-within:border-primary transition-all">
        {icon}
        <input type="text" value={value} readOnly className="bg-transparent border-none p-0 w-full text-sm font-bold focus:outline-none" placeholder="--" />
      </div>
    </div>
  );
}

function PatientCard({ 
  name, id, room, status, statusIcon, statusBg, statusText, avatarBg, vitals, stages 
}: { 
  name: string, id: string, room: string, status: string, statusIcon: React.ReactNode, 
  statusBg: string, statusText: string, avatarBg: string, 
  vitals: { hr: string, bp: string, spo2: string }, 
  stages: { label: string, state: 'past' | 'current' | 'future' }[] 
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full ${avatarBg} flex items-center justify-center`}>
            <User className="text-secondary w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-on-surface font-headline">{name}</h3>
            <p className="text-xs text-on-surface-variant font-semibold tracking-wider">ID: {id} • ROOM {room}</p>
          </div>
        </div>
        <div className={`${statusBg} ${statusText} px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2`}>
          {statusIcon}
          {status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 bg-surface-container-low p-4 rounded-xl">
        <VitalInput label="Heart Rate (BPM)" icon={<Heart className="text-primary w-4 h-4 mr-2" />} value={vitals.hr} />
        <VitalInput label="Blood Pressure" icon={<Gauge className="text-primary w-4 h-4 mr-2" />} value={vitals.bp} />
        <VitalInput label="SPO2 (%)" icon={<Wind className="text-primary w-4 h-4 mr-2" />} value={vitals.spo2} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-on-surface-variant pl-1">Update Surgery Stage</p>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {stages.map((stage, idx) => (
            <button key={idx} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              stage.state === 'current' 
                ? 'bg-primary text-white shadow-sm' 
                : 'border border-outline-variant text-outline bg-transparent hover:bg-surface-container'
            }`}>
              {stage.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiveStatusCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-fixed-dim/20 to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2">Live Status</h3>
        <p className="text-4xl font-extrabold text-teal-900 tracking-tighter leading-none mb-1 font-headline">Optimal</p>
        <p className="text-xs font-semibold text-on-surface-variant">System connected to all monitors</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[92%] rounded-full"></div>
          </div>
          <span className="text-[10px] font-bold text-primary">92%</span>
        </div>
      </div>
    </div>
  );
}

function AlertCenterCard() {
  return (
    <div className="bg-surface-container-low rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-on-surface font-headline">Alert Center</h3>
        <span className="bg-error text-white text-[10px] font-black px-2 py-0.5 rounded-full">2 NEW</span>
      </div>
      <div className="space-y-4">
        {/* Critical Alert */}
        <div className="bg-white p-4 rounded-xl border-l-4 border-error shadow-sm">
          <div className="flex gap-3">
            <div className="text-error mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-on-surface">Ny. Siti Aminah</p>
              <p className="text-xs text-error font-semibold">Tachycardia Warning: HR 142</p>
              <p className="text-[10px] text-on-surface-variant mt-2">Just Now • Room 302</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 py-1.5 rounded-lg bg-error text-white text-xs font-bold hover:bg-error/90 transition-colors">Acknowledge</button>
            <button className="flex-1 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant text-xs font-bold hover:bg-surface-container-highest transition-colors">Details</button>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-white p-4 rounded-xl border-l-4 border-primary shadow-sm">
          <div className="flex gap-3">
            <div className="text-primary mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">Ny. Anindita Putri</p>
              <p className="text-xs text-on-surface-variant">Pre-op labs ready for review</p>
              <p className="text-[10px] text-on-surface-variant mt-2">12 min ago • Room 304</p>
            </div>
          </div>
        </div>

        {/* Minimalist Alert */}
        <div className="bg-surface-container-high/40 p-4 rounded-xl border-l-4 border-outline-variant">
          <div className="flex gap-3">
            <div className="text-outline mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant">Staff Rotation: Dr. Sarah Connor</p>
              <p className="text-[10px] text-on-surface-variant">Shift check-in successful</p>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full mt-6 text-primary text-xs font-bold py-2 hover:bg-primary/5 rounded-lg transition-colors uppercase tracking-widest">View All Notifications</button>
    </div>
  );
}

function DailyStatsCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
      <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Daily Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] font-bold text-on-surface-variant">COMPLETED</p>
          <p className="text-2xl font-black text-primary font-headline">12</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <p className="text-[10px] font-bold text-on-surface-variant">PENDING</p>
          <p className="text-2xl font-black text-tertiary font-headline">04</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body">
      {/* TopNav */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold tracking-tight text-primary font-headline">SI-CEKAT+</h1>
          <div className="hidden md:flex items-center bg-surface-container-high rounded-full px-4 py-1.5 w-96">
            <Search className="text-outline w-4 h-4 mr-2" />
            <input type="text" placeholder="Search patients by ID or name..." className="bg-transparent border-none focus:outline-none text-sm w-full font-body placeholder:text-outline" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="p-2 text-error hover:bg-error-container/20 rounded-full">
            <Asterisk className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/30">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-on-surface">Dr. Sarah Connor</p>
              <p className="text-[10px] text-on-surface-variant">Surgery Ward A</p>
            </div>
            <UserCircle className="text-primary w-8 h-8" />
          </div>
        </div>
      </header>

      {/* SideNav */}
      <nav className="h-full w-64 fixed left-0 top-0 pt-20 bg-surface flex flex-col p-4 gap-2 border-r border-outline-variant/10">
        <div className="mb-6 px-4">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Surgery Ward A</p>
          <p className="text-lg font-black text-primary font-headline">Clinical Staff</p>
        </div>
        
        <NavItem icon={<LayoutDashboard className="w-5 h-5"/>} label="Dashboard" active />
        <NavItem icon={<Activity className="w-5 h-5"/>} label="Patient Monitoring" />
        <NavItem icon={<TrendingUp className="w-5 h-5"/>} label="Timeline Control" />
        <NavItem icon={<ClipboardList className="w-5 h-5"/>} label="Vital Signs" />
        <NavItem icon={<AlertTriangle className="w-5 h-5"/>} label="Alerts" />

        <div className="mt-auto pt-6 border-t border-outline-variant/10 flex flex-col gap-2">
          <button className="bg-primary text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5" />
            <span>Add New Patient</span>
          </button>
          <NavItem icon={<Settings className="w-5 h-5"/>} label="Settings" />
          <NavItem icon={<HelpCircle className="w-5 h-5"/>} label="Support" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="pl-64 pt-20 min-h-screen">
        <div className="p-8 grid grid-cols-12 gap-8">
          {/* Header */}
          <div className="col-span-12 flex justify-between items-end mb-4">
            <div>
              <h2 className="text-3xl font-extrabold text-on-surface tracking-tight font-headline">Active Patients</h2>
              <p className="text-on-surface-variant font-medium">Real-time C-section monitoring portal</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-primary uppercase">Live Monitoring</span>
              </div>
            </div>
          </div>
          
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <PatientCard 
              name="Ny. Siti Aminah"
              id="#CS-2901"
              room="302"
              status="Operasi Dimulai"
              statusIcon={<Clipboard className="w-4 h-4" />}
              statusBg="bg-tertiary-container"
              statusText="text-on-tertiary-container"
              avatarBg="bg-secondary-container"
              vitals={{ hr: '88', bp: '120/80', spo2: '98' }}
              stages={[
                { label: 'Persiapan', state: 'past' },
                { label: 'Operasi Dimulai', state: 'current' },
                { label: 'Bayi Lahir', state: 'future' },
                { label: 'Selesai Operasi', state: 'future' }
              ]}
            />
            <PatientCard 
              name="Ny. Anindita Putri"
              id="#CS-2905"
              room="304"
              status="Persiapan"
              statusIcon={<Clock className="w-4 h-4" />}
              statusBg="bg-surface-container-high"
              statusText="text-on-surface-variant"
              avatarBg="bg-secondary-container/50"
              vitals={{ hr: '', bp: '', spo2: '' }}
              stages={[
                { label: 'Persiapan', state: 'current' },
                { label: 'Operasi Dimulai', state: 'future' },
                { label: 'Bayi Lahir', state: 'future' },
                { label: 'Selesai Operasi', state: 'future' }
              ]}
            />
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <LiveStatusCard />
            <AlertCenterCard />
            <DailyStatsCard />
          </div>
        </div>
      </main>

      {/* Contextual FAB */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="w-14 h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform active:scale-95">
          <PlusSquare className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
