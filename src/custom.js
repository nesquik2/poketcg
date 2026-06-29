import React, {useState, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import './styles/CustomCard.css'

const COLORS = ['#E27396', '#ea9a9a', '#EFCFE3', '#EAF2D7', '#B3DEE2', '#BB8FDB'];

const starToRarity = {
    1: "common", 
    2: "uncommon",
    3: "rare", 
    4: "ultra", 
    5: "legendary"
}

export default function CustomCard({ onSaveCard }){
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState(COLORS[0]);
    const [brushSize, setBrushSize] = useState(4);

    const brushSizes = [
        { size: 2, img: "pics://smallbrush.png" },
        { size: 6, img: "pics://medbrush.png" },
        { size: 12, img: "pics://bigbrush.png" },
    ];

    const [eraser, setEraser] = useState(false);
    const [clearing, setClearing] = useState(false);

    const [cardName, setCardName] = useState('');
    const [stars, setStars] = useState(0);

    const lastPos = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height)
    }, []);

    function getPos(e, canvas){
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function startDrawing(e){
        const canvas = canvasRef.current;
        lastPos.current = getPos(e,canvas);
        setIsDrawing(true);
    }

    function draw(e){
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        const pos = getPos(e, canvas);

        context.beginPath();
        context.moveTo(lastPos.current.x, lastPos.current.y);
        context.lineTo(pos.x, pos.y);
        context.strokeStyle = eraser ? 'white' : color;
        context.lineWidth = eraser ? brushSize * 3 : brushSize;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();

        lastPos.current = pos;
    }

    function stopDrawing() {
        setIsDrawing(false);
        lastPos.current = null;
    }

    function clearCanvas() {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0,0,canvas.width, canvas.height);

        setClearing(true);
        setTimeout(() => setClearing(false), 300);
    }

    function saveCard() {
        if (!cardName.trim()){
            alert('name your card!');
            return;
        }

        if (stars === 0) {
            alert('pick a rarity!');
            return;
        }

        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL('image/png');
        const newCard ={
            name: cardName.trim(),
            rarity: starToRarity[stars],
            image: imageData
        };
        onSaveCard(newCard);
        navigate('/');
    }

    

    return (
       <div className="custom-card-page">
        <button onClick={() => navigate('/')}><img src="pics://home.png" alt="home" style={{ boxShadow: 'none', maxHeight: "40px"}}/></button>
        <h3 style={{color:'#bf4068', margin: '10px'}}>draw your own card ⋆˚࿔</h3>

        <input
            type="text"
            placeholder=" ⊹ card name ⊹ "
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="card-name-input"
            maxLength={15}
        />

        <div className="drawing-area">
            {/* left toolbar */}
            <div className="toolbar">
                <div className="palette">
                    {COLORS.map(c => (
                        <div key={c} className="color-swatch"
                            style={{
                                backgroundColor: c,
                                outline: color === c && !eraser ? '2px solid #3ac7bb' : 'none'
                            }}
                            onClick={() => { setColor(c); setEraser(false); }}
                        />
                    ))}
                </div>

                <button onClick={() => setEraser(true)}>
                    <img src="pics://eraser.png" alt="eraser"
                        style={{ boxShadow: 'none', maxHeight: "35px",
                            opacity: eraser ? 1 : 0.4
                        }}/>
                </button>

                <button onClick={clearCanvas}>
                    <img src="pics://clear.png" alt="clear"
                        style={{ boxShadow: 'none', maxHeight: "40px",
                            opacity: clearing ? 0.3 : 1,
                            transition: 'opacity 0.3s'
                        }}/>
                </button>
            </div>

            {/* canvas */}
            <canvas
                ref={canvasRef}
                width={180}
                height={280}
                className="draw-canvas"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
        </div>

        <div className="brush-controls">
            {brushSizes.map(b => (
                <button key={b.size} onClick={() => setBrushSize(b.size)}>
                    <img src={b.img} alt={`brush ${b.size}`}
                        style={{ boxShadow: 'none', maxHeight: "20px",
                            opacity: brushSize === b.size && !eraser ? 1 : 0.4
                        }}/>
                </button>
            ))}
        </div>

        {/* rarity */}
        <div className="stars">
            {[1,2,3,4,5].map(i => (
                <span key={i} onClick={() => setStars(i)}
                    style={{ cursor: 'pointer', fontSize: '2.0rem',
                        color: i <= stars ? '#E27396' : '#ccc'
                    }}>
                    ꕥ
                </span>
            ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={saveCard}>
                <img src="pics://save.png" alt="save" style={{ boxShadow: 'none', maxHeight: "30px"}}/>
            </button>
        </div>
    </div>
    )

}