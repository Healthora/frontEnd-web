import React from 'react';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => (
    <div className={`fixed bottom-6 right-6 z-100 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border animate-in slide-in-from-bottom-4 duration-300 ${type === 'success'
        ? 'bg-white border-emerald-200'
        : 'bg-white border-red-200'
        }`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${type === 'success' ? 'bg-emerald-100' : 'bg-red-100'
            }`}>
            {type === 'success'
                ? <CheckCircle className="w-4 h-4 text-emerald-600" />
                : <AlertTriangle className="w-4 h-4 text-red-500" />
            }
        </div>
        <p className={`text-sm font-semibold ${type === 'success' ? 'text-slate-800' : 'text-red-700'
            }`}>{message}</p>
        <button onClick={onClose} className="ml-2 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
        </button>
    </div>
);

export default Toast;
