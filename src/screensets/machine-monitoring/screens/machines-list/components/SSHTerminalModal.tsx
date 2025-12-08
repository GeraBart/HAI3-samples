import { useState, useRef, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@hai3/uikit';
import _ from 'lodash';

interface SSHTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostname: string;
  ipAddress: string;
  tk: (key: string) => string;
}

type TerminalState = 'connecting' | 'login' | 'password' | 'authenticated' | 'denied';

interface HistoryEntry {
  type: 'system' | 'input' | 'output' | 'error';
  content: string;
}

export function SSHTerminalModal({ isOpen, onClose, hostname, ipAddress, tk }: SSHTerminalModalProps) {
  const [state, setState] = useState<TerminalState>('connecting');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [username, setUsername] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const addHistory = useCallback((entry: HistoryEntry) => {
    setHistory(prev => [...prev, entry]);
  }, []);

  // Reset state when modal opens
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setState('connecting');
    setHistory([]);
    setCurrentInput('');
    setUsername('');

    // Simulate connection
    const timer = setTimeout(() => {
      setHistory([
        { type: 'system', content: `Connecting to ${ipAddress}...` },
        { type: 'system', content: `SSH connection established to ${hostname}` },
        { type: 'system', content: '' },
      ]);
      setState('login');
    }, 800);

    return () => clearTimeout(timer);
  }, [isOpen, hostname, ipAddress]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when state changes
  useEffect(() => {
    if (inputRef.current && state !== 'connecting') {
      inputRef.current.focus();
    }
  }, [state, history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const input = _.trim(currentInput);

    if (state === 'login') {
      addHistory({ type: 'input', content: `login: ${input}` });
      setUsername(input);
      setCurrentInput('');
      setState('password');
    } else if (state === 'password') {
      addHistory({ type: 'input', content: `password: ${'*'.repeat(input.length)}` });
      setCurrentInput('');

      // Check credentials
      if (username === 'root' && input === 'root') {
        addHistory({ type: 'system', content: '' });
        addHistory({ type: 'system', content: `Welcome to ${hostname}` });
        addHistory({ type: 'system', content: `Last login: ${new Date().toLocaleString()}` });
        addHistory({ type: 'system', content: '' });
        setState('authenticated');
      } else {
        addHistory({ type: 'error', content: 'Permission denied, please try again.' });
        addHistory({ type: 'system', content: '' });
        setState('login');
        setUsername('');
      }
    } else if (state === 'authenticated') {
      addHistory({ type: 'input', content: `root@${hostname}:~# ${input}` });
      setCurrentInput('');

      // Simple command simulation
      const cmd = _.toLower(_.trim(input));
      if (cmd === '' || cmd === '\n') {
        // Empty command, just show new prompt
      } else if (cmd === 'whoami') {
        addHistory({ type: 'output', content: 'root' });
      } else if (cmd === 'hostname') {
        addHistory({ type: 'output', content: hostname });
      } else if (cmd === 'pwd') {
        addHistory({ type: 'output', content: '/root' });
      } else if (cmd === 'date') {
        addHistory({ type: 'output', content: new Date().toString() });
      } else if (cmd === 'uptime') {
        addHistory({ type: 'output', content: ' 12:34:56 up 30 days,  5:42,  1 user,  load average: 0.15, 0.10, 0.09' });
      } else if (cmd === 'uname -a') {
        addHistory({ type: 'output', content: `Linux ${hostname} 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux` });
      } else if (cmd === 'ls' || cmd === 'ls -la') {
        addHistory({ type: 'output', content: 'total 32' });
        addHistory({ type: 'output', content: 'drwx------  4 root root 4096 Dec  8 10:00 .' });
        addHistory({ type: 'output', content: 'drwxr-xr-x 18 root root 4096 Nov 15 08:30 ..' });
        addHistory({ type: 'output', content: '-rw-------  1 root root  512 Dec  8 09:45 .bash_history' });
        addHistory({ type: 'output', content: '-rw-r--r--  1 root root 3106 Dec  1 12:00 .bashrc' });
        addHistory({ type: 'output', content: 'drwx------  2 root root 4096 Nov 20 14:22 .ssh' });
      } else if (cmd === 'free -h') {
        addHistory({ type: 'output', content: '              total        used        free      shared  buff/cache   available' });
        addHistory({ type: 'output', content: 'Mem:           64Gi        48Gi       2.1Gi       1.2Gi        14Gi        13Gi' });
        addHistory({ type: 'output', content: 'Swap:         8.0Gi       512Mi       7.5Gi' });
      } else if (cmd === 'df -h') {
        addHistory({ type: 'output', content: 'Filesystem      Size  Used Avail Use% Mounted on' });
        addHistory({ type: 'output', content: '/dev/sda1       500G  320G  180G  64% /' });
        addHistory({ type: 'output', content: '/dev/sdb1       2.0T  1.2T  800G  60% /data' });
      } else if (cmd === 'clear') {
        setHistory([]);
      } else if (cmd === 'exit' || cmd === 'logout') {
        addHistory({ type: 'system', content: 'Connection closed.' });
        setTimeout(() => onClose(), 500);
      } else if (cmd === 'help') {
        addHistory({ type: 'output', content: 'Available commands: whoami, hostname, pwd, date, uptime, uname -a, ls, free -h, df -h, clear, exit' });
      } else {
        addHistory({ type: 'error', content: `bash: ${_.split(input, ' ')[0]}: command not found` });
      }
    }
  };

  const getPrompt = () => {
    switch (state) {
      case 'connecting':
        return '';
      case 'login':
        return 'login: ';
      case 'password':
        return 'password: ';
      case 'authenticated':
        return `root@${hostname}:~# `;
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 gap-0 bg-[#1e1e1e] border-[#333]">
        <DialogHeader className="px-4 py-2 border-b border-[#333] bg-[#2d2d2d]">
          <DialogTitle className="text-sm font-mono text-[#ccc] flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            SSH: {username || 'root'}@{hostname} ({ipAddress})
          </DialogTitle>
        </DialogHeader>

        <div
          ref={terminalRef}
          className="h-[400px] overflow-y-auto p-4 font-mono text-sm text-[#d4d4d4] bg-[#1e1e1e]"
          onClick={() => inputRef.current?.focus()}
        >
          {/* History */}
          {history.map((entry, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap ${
                entry.type === 'error' ? 'text-red-400' :
                entry.type === 'system' ? 'text-[#6a9955]' :
                entry.type === 'input' ? 'text-[#d4d4d4]' :
                'text-[#d4d4d4]'
              }`}
            >
              {entry.content || '\u00A0'}
            </div>
          ))}

          {/* Current input line */}
          {state !== 'connecting' && state !== 'denied' && (
            <div className="flex items-center">
              <span className="text-[#569cd6] whitespace-pre">{getPrompt()}</span>
              <input
                ref={inputRef}
                type={state === 'password' ? 'password' : 'text'}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#d4d4d4] font-mono text-sm"
                autoFocus
                autoComplete="off"
                spellCheck={false}
              />
              <span className="w-2 h-4 bg-[#d4d4d4] animate-pulse" />
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-[#333] bg-[#2d2d2d] text-xs text-[#888] font-mono">
          {tk('ssh.hint')}
        </div>
      </DialogContent>
    </Dialog>
  );
}
