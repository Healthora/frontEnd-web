import React from 'react';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';

const DeleteConfirmModal = ({ patient, onClose, onConfirm, loading }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Supprimer le patient ?</h3>
                <p className="text-slate-500 text-sm mb-1">
                    Vous êtes sur le point de supprimer
                </p>
                <p className="font-bold text-slate-800 text-base mb-4">{patient.name}</p>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium mb-6">
                    ⚠️ Si ce patient a des rendez-vous, toutes les données seront perdues.
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all font-sans"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm} disabled={loading}
                        className="flex-1 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-red-200 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 font-sans"
                    >
                        {loading
                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Suppression...</>
                            : <><Trash2 className="w-4 h-4" /> Supprimer</>
                        }
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default DeleteConfirmModal;
