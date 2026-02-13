import React from 'react';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';

const DeleteConfirmModal = ({ 
    itemName, 
    title = "Supprimer l'élément ?", 
    message = "Vous êtes sur le point de supprimer", 
    warning = "Toutes les données associées seront perdues.", 
    onClose, 
    onConfirm, 
    loading 
}) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
        {/* Modal Container: Max-width is set to sm, but w-full ensures it stretches nicely on mobile */}
        <div className="bg-white w-full max-w-[380px] rounded-[28px] sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
                {/* Icon Container */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
                </div>

                {/* Text Content */}
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2 leading-tight">
                    {title}
                </h3>
                
                <div className="space-y-1 mb-4">
                    <p className="text-slate-500 text-sm">
                        {message}
                    </p>
                    <p className="font-bold text-slate-800 text-base break-words px-2">
                        {itemName}
                    </p>
                </div>

                {/* Warning Box */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium mb-6 flex items-start gap-2 text-left">
                    <span className="shrink-0">⚠️</span>
                    <span>{warning}</span>
                </div>

                {/* Action Buttons: Vertical stack on very small screens, horizontal on others */}
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full py-3 sm:py-3.5 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm} 
                        disabled={loading}
                        className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-red-200 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> 
                                <span className="sm:inline">Suppression...</span>
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" /> 
                                <span>Supprimer</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default DeleteConfirmModal;