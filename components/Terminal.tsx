"use client";

import { useEffect, useRef, useState, useCallback, FormEvent } from 'react';

// --- UTILITIES ---

/**
 * Calculates the Levenshtein distance between two strings.
 */
const getLevenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

const BANNER = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣶⠿⠛⠛⠛⠉⠉⠉⠉⠀⠀⠉⠉⠉⠛⠛⠿⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⣦⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⠷⣶⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⣻⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣠⣴⡾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣻⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢠⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣀⣀⣀⠀⠀⠀⠀⠀⠘⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢻⣿⣶⢶⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⢼⡿⠟⠛⠛⠿⠀⠀⠀⠀⠀⠘⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠉⠻⢷⣿⠇⠀⠀⠀⠀⢀⣴⡿⠿⠿⠿⠇⠀⠀⠀⢾⣿⣿⣿⣟⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣧⠀⠀⠀⠀⣀⣀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣾⡟⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⣿⠛⠁⠀⠀⠀⠀⠀⠀⠸⡇⠀⠀⠀⠀⠶⠚⠛⠛⠿⢿⣿⣿⣷⣾⠟⢻⣷⣀⠀
⠀⠀⠀⠀⠀⠀⣿⠃⠀⣀⣀⠀⠀⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⣿⣄⡀⠀⠀⠀⠀⠀⣀⣼⠇⠀⠀⠀⠀⢤⣤⣄⣀⠀⢸⣿⡿⠀⠀⠀⠈⠛⣿⡇
⠀⠀⠀⠀⠀⣸⣿⠟⠛⠉⠉⠁⠀⠀⠀⠀⠘⢿⣦⣄⣀⣀⣀⣠⣴⠞⠉⠙⠛⢿⣶⠶⠶⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠉⠙⢷⣾⠟⠁⠀⠀⠀⠀⠀⣿⡅
⠀⠀⠀⣴⠟⢻⡇⠀⠀⣠⡴⠖⠀⠀⠀⠀⠀⠀⠉⠉⠛⠛⠛⠻⣧⡀⠀⠀⢀⣴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠋⠀⠀⠀⠀⠀⠀⢀⣿⠏
⠀⠀⠈⠁⠀⢸⣇⣴⠞⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠷⠾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠟⠁⠀⠀⠀⠀⠀⠀⠀⣾⠃⠀
⠀⠀⠀⠀⠀⢠⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡾⠃⠀⠀⠀⠀⠀⠀⠀⠀⣼⡟⠀⠀
⠀⠀⠀⠀⢠⡿⠉⢿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠜⠁⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⠁⠀⠀
⠀⠀⠀⠀⠘⠀⠀⢸⣿⠻⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⠃⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⣿⠃⠀⠀⠈⠓⠒⢦⠰⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡿⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡟⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣼⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣠⣾⠟⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠈⢿⣇⡀⠀⠀⠀⢀⣠⣴⣶⡿⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⠻⢷⣶⣶⣿⠿⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⠀⠀⠀⠀⠀⠀⠀⠀
`;

// --- TYPES & COMMANDS ---

type Command = {
  cmd: string;
  output: string[];
};

type CommandDefinition = {
  description: string;
  execute: (args?: string[]) => string[];
};

const commands: Record<string, CommandDefinition> = {
  help: {
    description: 'Show available commands',
    execute: () => [
      'Available commands:',
      ...Object.entries(commands).map(([cmd, { description }]) => 
        `  ${cmd.padEnd(12)} ${description}`
      ),
      `  ${'clear'.padEnd(12)} Clear the terminal screen`
    ]
  },
  about: {
    description: 'About me',
    execute: () => [
      'Hello! I\'m John De Corte, a full-stack developer.',
      'I specialize in building modern web applications with clean, efficient code.',
      'Passionate about creating intuitive user experiences and solving complex problems.'
    ]
  },
  skills: {
    description: 'My technical skills',
    execute: () => [
      'Frontend: React, Next.js, TypeScript, TailwindCSS',
      'Backend: Node.js, Python, SQL/NoSQL',
      'Tools: Git, Docker, AWS, CI/CD',
      'Languages: JavaScript, TypeScript, Python, Java'
    ]
  },
  contact: {
    description: 'How to contact me',
    execute: () => [
      'Email: jdecorte@proton.me',
      'GitHub: github.com/jdecorte-be',
      'LinkedIn: linkedin.com/in/johndecorte',
      'Twitter: @jdecorte'
    ]
  },
  echo: {
    description: 'Echo the input',
    execute: (args = []) => [args.join(' ')]
  },
};


const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isWelcomeDone, setIsWelcomeDone] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);
  
  // FIX: Use a ref to ensure the initialization routine runs only once.
  const isInitialRun = useRef(true); 

  // Track if we've completed the initial render
  const [hasInitialized, setHasInitialized] = useState(false);

  // Only scroll to bottom for new commands, not on initial render
  useEffect(() => {
    if (hasInitialized && history.length > 2 && terminalContentRef.current && endOfTerminalRef.current) {
      // Only scroll the terminal content, not the whole page
      const terminalContent = terminalContentRef.current;
      const endElement = endOfTerminalRef.current;
      terminalContent.scrollTo({
        top: endElement.offsetTop - terminalContent.offsetTop,
        behavior: 'smooth'
      });
    } else {
      setHasInitialized(true);
    }
  }, [history, hasInitialized]);

  // Command execution logic, including 'clear'
  const executeCommand = useCallback((cmd: string) => {
    if (!cmd.trim()) return;

    const trimmedInput = cmd.trim();

    // Add to command history
    setCommandHistory(prev => 
      prev[prev.length - 1] !== trimmedInput ? [...prev, trimmedInput] : prev
    );
    setHistoryIndex(-1);

    const [command, ...args] = trimmedInput.split(/\s+/);
    const trimmedCmd = command.toLowerCase();

    // --- Special Command: Clear ---
    if (trimmedCmd === 'clear') {
        setHistory([]);
        return;
    }
    // ------------------------------

    let output: string[] = [];

    if (commands[trimmedCmd]) {
      output = commands[trimmedCmd].execute(args);
    } else {
      // Command not found + suggestions
      const suggestions = [...Object.keys(commands), 'clear'].filter(c => 
        c.startsWith(trimmedCmd) || 
        getLevenshteinDistance(trimmedCmd, c) <= 2
      );
      
      output = [`Command not found: ${trimmedCmd}`];
      if (suggestions.length > 0) {
        output.push(`Did you mean: ${suggestions.join(', ')}?`);
      }
      output.push("Type 'help' to see available commands.");
    }

    setHistory(prev => [...prev, { cmd: trimmedInput, output }]);
  }, []); 

  // Type welcome message with typing effect and banner display
  const typeWelcomeMessage = useCallback(async () => {
    // 1. Display Banner
    setHistory([{ cmd: 'banner', output: BANNER.split('\n') }]);
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const welcomeMessage = 'Welcome to my interactive terminal! Type `help` to see available commands.';
    
    // 2. Type the welcome message
    const welcomeTypingCmd: Command = { cmd: 'welcome', output: [''] };
    setHistory(prev => [...prev, welcomeTypingCmd]);

    for (let i = 0; i <= welcomeMessage.length; i++) {
      // Minor optimization: Use requestAnimationFrame or shorter timeout if performance is key
      await new Promise(resolve => setTimeout(resolve, 15)); 
      
      setHistory(prev => {
        const newHistory = [...prev];
        if (newHistory.length > 0 && newHistory[newHistory.length - 1].cmd === 'welcome') {
             newHistory[newHistory.length - 1].output = [welcomeMessage.slice(0, i)];
        }
        return newHistory;
      });
    }
    
    // 3. Show help automatically and mark welcome sequence complete
    setHistory(prev => [...prev, { cmd: 'help', output: commands.help.execute() }]);
    setIsWelcomeDone(true);
    inputRef.current?.focus();
  }, []);
  
  // Focus input on mount and execute welcome message ONCE
  useEffect(() => {
    inputRef.current?.focus();
    
    if (isInitialRun.current) {
        isInitialRun.current = false; // Mark as run
        typeWelcomeMessage();
    }
  }, [typeWelcomeMessage]); // typeWelcomeMessage is a stable dependency

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isWelcomeDone) return;
    
    executeCommand(input);
    setInput('');
  }, [input, executeCommand, isWelcomeDone]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const commandKeys = [...Object.keys(commands), 'clear'];

    // Up arrow & Down arrow logic for history navigation
    if (e.key === 'ArrowUp' && commandHistory.length > 0) {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      if (newIndex >= 0) {
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      if (newIndex >= -1) {
        setInput(newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      }
    }
    // Tab autocomplete logic
    else if (e.key === 'Tab') {
      e.preventDefault();
      if (!input.trim()) return;
      
      // Only autocomplete the primary command
      const inputParts = input.split(/\s+/);
      const currentInput = inputParts[0].toLowerCase(); 
      
      if (currentInput) {
        const matches = commandKeys.filter(cmd => 
          cmd.startsWith(currentInput)
        );
        
        if (matches.length === 1) {
          // Replace the current command part and add a space
          setInput(matches[0] + ' ');
        } else if (matches.length > 1) {
          setHistory(prev => [
            ...prev,
            { cmd: 'system', output: [`${matches.length} possible completions:`, ...matches.sort()] }
          ]);
        }
      }
    }
  }, [commandHistory, historyIndex, input, setInput, setHistory, setHistoryIndex]);

  // Prompt Rendering Helper
  const renderPrompt = () => (
    <div className="flex items-center select-none whitespace-nowrap">
      <span className="text-blue-400 font-bold">visitor</span>
      <span className="text-gray-500">@</span>
      <span className="text-green-400">jdecorte</span>
      <span className="text-gray-500">:</span>
      <span className="text-purple-400">~</span>
      <span className="ml-1 text-gray-400">$</span>
    </div>
  );

  const renderHistoryItem = (item: Command, idx: number) => {
    if (item.cmd === 'banner') {
        return (
            <pre key={idx} className="text-cyan-400 text-sm mb-4 whitespace-pre-wrap leading-none">
                {item.output.join('\n')}
            </pre>
        );
    }

    const isCommand = item.cmd !== 'welcome' && item.cmd !== 'system';
    
    return (
        <div key={idx} className="break-words">
            {isCommand && (
                <div className="flex items-start">
                    {renderPrompt()}
                    <span className="ml-2 text-gray-100">{item.cmd}</span>
                </div>
            )}
            {item.output.length > 0 && (
                <div className={`${isCommand ? 'mt-1' : ''} text-gray-300`}>
                    {item.output.map((line, i) => (
                        <div 
                            key={i} 
                            className={`whitespace-pre-wrap ${
                                item.cmd === 'system' ? 'text-yellow-400' : ''
                            }`}
                        >
                            {line}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
  }

  return (
    <div 
      className=" text-gray-100 p-4 md:p-8"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="justify-center">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
          
          {/* Terminal Header */}
          <div className="flex items-center bg-gray-700 px-4 py-2 select-none">
            <div className="flex space-x-2 mr-3">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"/>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer" />
            </div>
            <div className="text-center flex-grow text-sm font-mono text-gray-300">
              jdecorte@terminal: ~
            </div>
          </div>

          {/* Terminal Body (History) */}
          <div 
            ref={terminalContentRef}
            className="p-4 font-mono text-sm h-[60vh] overflow-y-auto bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="space-y-4">
              {history.map(renderHistoryItem)}
              <div ref={endOfTerminalRef} />
            </div>
          </div>

          {/* Input Area */}
          <div 
            className="bg-gray-800 border-t border-gray-700 p-4"
            onClick={(e) => { e.stopPropagation(); inputRef.current?.focus(); }}
          >
            <form onSubmit={handleSubmit} className="flex items-center">
              {isWelcomeDone ? (
                <>
                    {renderPrompt()}
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="bg-transparent border-none outline-none flex-grow px-2 text-green-400 caret-green-400 focus:ring-0"
                      spellCheck="false"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                    />
                </>
              ) : (
                // Display initialization message while waiting for welcome sequence
                <div className="text-blue-400 font-bold">Initializing terminal, please wait...</div>
              )}
            </form>
          </div>
        </div>
        
        {/* Help text */}
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>Tip: Use <kbd>↑</kbd> and <kbd>↓</kbd> to navigate command history, <kbd>Tab</kbd> for autocomplete.</p>
        </div>
      </div>
    </div>
  );
};

export default Terminal;