'use client';
import PanelButton from '@/helper/Buttons/PlaneButton';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const colors = [
    '#FFB800', '#2060F9', '#8B4F00', '#3CA53C',
    '#FFB56A', '#B858E6', '#4FA2A2', '#FF1A1A',
];

const UISettingsPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => setIsOpen((prev) => !prev);
    const closeDrawer = () => setIsOpen(false);

    const drawerWidth = 320; // 20rem

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="overlay"
                        className="fixed inset-0 bg-black bg-opacity-40 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={closeDrawer}
                    />
                )}
            </AnimatePresence>

            {/* Button that moves horizontally */}
            <motion.button
                onClick={toggleDrawer}
                className="fixed top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-tr rounded-br flex items-center justify-center cursor-pointer z-50"
                style={{ minWidth: 48, minHeight: 48 }}
                animate={{ x: isOpen ? drawerWidth : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    style={{ display: 'inline-block', transformOrigin: '50% 50%' }}
                >
                    <Icon icon="lets-icons:setting-fill" width={24} height={24} />
                </motion.div>
            </motion.button>

            {/* Sliding drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="drawer-container"
                        className="fixed top-14 left-0 h-full bg-white shadow-lg p-6 overflow-auto z-40"
                        initial={{ x: -drawerWidth }}
                        animate={{ x: 0 }}
                        exit={{ x: -drawerWidth }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{ width: drawerWidth }}
                    >
                       
                        <h2 className="text-center font-bold mb-4">MULTIPLE COLORS</h2>
                        <div className="grid grid-cols-4 gap-4 mb-8">
                            {colors.map((color, i) => (
                                <div
                                    key={i}
                                    style={{ backgroundColor: color }}
                                    className="h-12 rounded"
                                />
                            ))}
                        </div>

                        <h2 className="text-center font-bold mb-4">BOXED VERSION</h2>
                        <div className="flex justify-center gap-4 mb-8">
                            <PanelButton text="BOXED" />
                            <PanelButton text="FULL WIDTH" />
                        </div>

                        <div className="flex justify-center gap-4 mb-8">
                            <PanelButton text="NO" />
                            <PanelButton text="YES" bgColor="bg-black" />
                        </div>

                        <div className="flex justify-center gap-4 mb-8">
                            <PanelButton text="YES" />
                            <PanelButton text="NO" bgColor="bg-black" />
                        </div>


                        <p className="text-center text-gray-500 text-sm">
                            You Will Find Much More Options For Colors And Styling In Admin Panel.
                            This Color Picker Is Used Only For Demonstration Purposes.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default UISettingsPanel;
