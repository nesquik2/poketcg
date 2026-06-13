import {motion } from 'framer-motion';
import { confetti } from "@tsparticles/confetti";
import React, { useState } from 'react';


export const ChoosePack = ({ set, images, onOpen }) => {
    const [clicks, setClicks] = useState(0);
    const [bouncing, setBouncing] = useState(false);
    const [opening, setOpening] = useState(false);

    const messages = ["tap to open", "keep going...", "one more!"];

    function handleClick() {
        if (opening) return; // ignore clicks during opening animation

        if (clicks < 2) {
            // bounce animation
            setBouncing(true);
            setTimeout(() => setBouncing(false), 400);

            // particle burst
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { x: 0.5, y: 0.5 },
                colors: ['#f8e2e6', '#ffd6e0', '#ffe897', '#c4949c'],
            });

            setClicks(clicks + 1);
        } else {
            // third click — opening animation then transition
            setOpening(true);
            confetti({
                particleCount: 100,
                spread: 120,
                origin: { x: 0.5, y: 0.5 },
                colors: ['#f8e2e6', '#ffd6e0', '#ffe897', '#c4949c'],
            });
            setTimeout(() => onOpen(), 800); // wait for animation then open
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h2>open your pack</h2>
            <p>{messages[clicks]}</p>
            <motion.div
                onClick={handleClick}
                animate={
                    opening ? { scale: 1.5, opacity: 0, y: -50 } :
                    bouncing ? { y: [0, -20, 0] } :
                    { y: 0 }
                }
                transition={
                    opening ? { duration: 0.6 } :
                    bouncing ? { duration: 0.4 } :
                    {}
                }
                whileTap={!opening ? { scale: 0.9 } : {}}
                style={{ cursor: 'pointer' }}
            >
                <img src={images[set]} alt="pack" />
            </motion.div>
        </div>
    );
}