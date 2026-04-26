import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Search, Settings, FileText, BarChart2, Briefcase, Command as CmdIcon } from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={() => setOpen(false)}
      />
      <Command 
        className="relative z-50 w-[90%] max-w-[600px] rounded-xl border border-black/10 dark:border-white/10 bg-background shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-[0.98] duration-200"
      >
        <div className="flex items-center border-b border-black/10 dark:border-white/10 px-4">
          <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
          <Command.Input 
            autoFocus
            placeholder="Type a command or search..." 
            className="w-full h-14 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
          <div className="ml-3 shrink-0 flex items-center gap-1 border border-black/10 dark:border-white/10 px-2 py-1 rounded text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
             ESC to close
          </div>
        </div>
        
        <Command.List className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar">
          <Command.Empty className="py-12 text-center text-sm text-muted-foreground">
            No results found for your search.
          </Command.Empty>

          <Command.Group heading="Dashboards" className="text-xs font-semibold text-muted-foreground px-2 py-3">
            <Command.Item 
              onSelect={() => { navigate('/admin'); setOpen(false); }}
              className="flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 data-[selected=true]:bg-black/5 dark:data-[selected=true]:bg-white/5 outline-none transition-colors"
            >
              <div className="w-6 h-6 rounded-md bg-purple-500/10 flex items-center justify-center">
                <BarChart2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex flex-col">
                 <span className="font-medium">Overview</span>
                 <span className="text-[10px] text-muted-foreground">Main control center</span>
              </div>
            </Command.Item>
            
            <Command.Item 
              onSelect={() => { navigate('/admin/seo'); setOpen(false); }}
              className="flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 data-[selected=true]:bg-black/5 dark:data-[selected=true]:bg-white/5 outline-none transition-colors mt-1"
            >
              <div className="w-6 h-6 rounded-md bg-sky-500/10 flex items-center justify-center">
                <Search className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="flex flex-col">
                 <span className="font-medium">SEO Module</span>
                 <span className="text-[10px] text-muted-foreground">Scan and optimize rankings</span>
              </div>
            </Command.Item>
          </Command.Group>

          <div className="h-px bg-black/5 dark:bg-white/5 my-1 mx-2" />

          <Command.Group heading="Resources" className="text-xs font-semibold text-muted-foreground px-2 py-3">
            <Command.Item 
              onSelect={() => { navigate('/blog'); setOpen(false); }}
              className="flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 data-[selected=true]:bg-black/5 dark:data-[selected=true]:bg-white/5 outline-none transition-colors"
            >
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="font-medium">Blog & Insights</span>
            </Command.Item>
            
            <Command.Item 
              onSelect={() => { navigate('/services'); setOpen(false); }}
              className="flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 data-[selected=true]:bg-black/5 dark:data-[selected=true]:bg-white/5 outline-none transition-colors mt-1"
            >
              <div className="w-6 h-6 rounded-md bg-orange-500/10 flex items-center justify-center">
                <Briefcase className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="font-medium">Services</span>
            </Command.Item>
          </Command.Group>

          <div className="h-px bg-black/5 dark:bg-white/5 my-1 mx-2" />

          <Command.Group heading="System" className="text-xs font-semibold text-muted-foreground px-2 py-3">
            <Command.Item 
              onSelect={() => { navigate('/admin/settings'); setOpen(false); }}
              className="flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 data-[selected=true]:bg-black/5 dark:data-[selected=true]:bg-white/5 outline-none transition-colors"
            >
              <div className="w-6 h-6 rounded-md bg-slate-500/10 flex items-center justify-center">
                <Settings className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              </div>
              <span className="font-medium">Settings</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
        
        <div className="border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-[10px] text-muted-foreground flex items-center gap-4">
           <div className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 border border-black/10 dark:border-white/10 rounded">↑</span>
              <span className="px-1.5 py-0.5 border border-black/10 dark:border-white/10 rounded">↓</span>
              <span>to navigate</span>
           </div>
           <div className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 border border-black/10 dark:border-white/10 rounded">Enter</span>
              <span>to select</span>
           </div>
        </div>
      </Command>
    </div>
  );
}
