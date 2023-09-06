import { useEffect, useRef, useState } from 'react';

import Card from './components/Card.tsx';
import Hand from './components/Hand.tsx';
import Chip from './components/Chip.tsx';
import Label from './components/Label.tsx';
import Button from './components/Button.tsx';
import PlayerBust from './components/Modals/PlayerBust.tsx';
import DealerBust from './components/Modals/DealerBust.tsx';
import Push from './components/Modals/Push.tsx';
import PlayerWon from './components/Modals/PlayerWon.tsx';
import DealerWon from './components/Modals/DealerWon.tsx';

export type Points = {
    soft?: number;
    hard: number;
};

enum GameState {
    Betting,
    Dealing,
    PlayerDeciding,
    Standing,
    PlayerWon,
    DealerWon,
    PlayerBust,
    DealerBust,
    Push,
}

const defaultDeck = (): string[] => [
    'AH',
    '2H',
    '3H',
    '4H',
    '5H',
    '6H',
    '7H',
    '8H',
    '9H',
    'TH',
    'JH',
    'QH',
    'KH',
    'AD',
    '2D',
    '3D',
    '4D',
    '5D',
    '6D',
    '7D',
    '8D',
    '9D',
    'TD',
    'JD',
    'QD',
    'KD',
    'AC',
    '2C',
    '3C',
    '4C',
    '5C',
    '6C',
    '7C',
    '8C',
    '9C',
    'TC',
    'JC',
    'QC',
    'KC',
    'AS',
    '2S',
    '3S',
    '4S',
    '5S',
    '6S',
    '7S',
    '8S',
    '9S',
    'TS',
    'JS',
    'QS',
    'KS',
];

function App() {
    const [balance, setBalance] = useState<number>(1000);
    const deck = useRef<string[]>(defaultDeck());
    const [dealerHand, setDealerHand] = useState<(string | null)[]>([]);
    const [playerHand, setPlayerHand] = useState<string[]>([]);
    const [currentBet, setCurrentBet] = useState<number>(0);
    const [gameState, setGameState] = useState<GameState>(GameState.Betting);

    const playerPoints: Points = handToPoints(playerHand);
    const dealerPoints: Points = handToPoints(dealerHand);
    const playerBestValue: number =
        playerPoints.hard <= 21 || !playerPoints.soft
            ? playerPoints.hard
            : playerPoints.soft;
    const dealerBestValue: number =
        dealerPoints.hard <= 21 || !dealerPoints.soft
            ? dealerPoints.hard
            : dealerPoints.soft;
    const canDeal: boolean = gameState === GameState.Betting;
    const canStandOrHit: boolean = gameState === GameState.PlayerDeciding;

    function cardToPoints(card: string | null): Points {
        if (!card) return { hard: 0 };
        const value = card.slice(0, -1);
        const floatValue = parseFloat(value);
        if (!isNaN(floatValue)) {
            return { hard: floatValue };
        }
        switch (value) {
            case 'A':
                return { soft: 1, hard: 11 };
            case 'T':
            case 'J':
            case 'Q':
            case 'K':
                return { hard: 10 };
            default:
                return { hard: 0 };
        }
    }

    function handToPoints(hand: (string | null)[]): Points {
        const points: Points = { hard: 0 };
        hand.forEach((card) => {
            const cardPoints = cardToPoints(card);
            if (cardPoints.soft) {
                if (points.soft == null) points.soft = points.hard;
                points.soft += cardPoints.soft;
            } else if (points.soft) {
                points.soft += cardPoints.hard;
            }
            points.hard += cardPoints.hard;
        });
        return points;
    }

    function bet(amount: number): void {
        if (gameState !== GameState.Betting || balance < amount) return;
        setCurrentBet((previous) => previous + amount);
    }

    function resetBet(): void {
        if (gameState !== GameState.Betting) return;
        setCurrentBet(0);
    }

    function takeCardsFromDeck(amount: number): string[] {
        const cards = [];

        for (let i = 0; i < amount; i++) {
            const index = Math.floor(Math.random() * deck.current.length);
            const card = deck.current[index];
            cards.push(card);
            deck.current.splice(deck.current.indexOf(card), 1);
        }

        return cards;
    }

    function dealFirstCards(): void {
        if (gameState !== GameState.Betting) return;
        if (!currentBet) return alert('You must place a bet to play');
        setBalance((previous) => previous - currentBet);
        setGameState(GameState.Dealing);
        const cards = takeCardsFromDeck(3);
        setTimeout(() => {
            setDealerHand([cards[0], null]);
            setPlayerHand([cards[1], cards[2]]);
        }, 1000);
    }

    function dealToDealer(): void {
        const cards = takeCardsFromDeck(1);
        setTimeout(() => {
            setDealerHand((previous) => {
                if (previous[1] === null) {
                    return [previous[0], cards[0]];
                }
                return [...previous, cards[0]];
            });
        }, 1000);
    }

    function stand(): void {
        if (gameState !== GameState.PlayerDeciding) return;
        setGameState(GameState.Standing);
        dealToDealer();
    }

    function hit(): void {
        if (gameState !== GameState.PlayerDeciding) return;
        setGameState(GameState.Dealing);
        const cards = takeCardsFromDeck(1);
        setTimeout(() => {
            setPlayerHand((previous) => [...previous, cards[0]]);
        }, 1000);
    }

    function resetGame(): void {
        deck.current = defaultDeck();
        setPlayerHand([]);
        setDealerHand([]);
        setCurrentBet(0);
        setGameState(GameState.Betting);
    }

    function lost(): void {
        resetGame();
    }

    function won(): void {
        setBalance((previous) => previous + currentBet * 2);
        resetGame();
    }

    function push(): void {
        setBalance((previous) => previous + currentBet);
        resetGame();
    }

    useEffect(() => {
        if (gameState === GameState.Dealing) {
            if (playerBestValue === 21) {
                setGameState(GameState.Standing);
                return dealToDealer();
            }

            if (playerBestValue > 21) {
                setGameState(GameState.PlayerBust);
                return;
            }

            setGameState(GameState.PlayerDeciding);
        } else if (gameState === GameState.Standing) {
            if (dealerBestValue < 17) {
                return dealToDealer();
            }

            if (dealerBestValue > 21) {
                setGameState(GameState.DealerBust);
                return;
            }

            if (dealerBestValue === playerBestValue) {
                setGameState(GameState.Push);
                return;
            }

            if (playerBestValue > dealerBestValue) {
                setGameState(GameState.PlayerWon);
                return;
            }

            setGameState(GameState.DealerWon);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerHand, dealerHand]);

    return (
        <main className="flex flex-col w-full h-full gap-6 p-8">
            <div className="flex items-center justify-between">
                <h1>Blackjack</h1>
                <Label>
                    Balance: <strong>£{balance.toFixed(2)}</strong>
                </Label>
            </div>
            <div className="flex flex-col justify-around grow">
                <Hand points={dealerPoints}>
                    {dealerHand.map((card, index) => (
                        <Card value={card} key={index} />
                    ))}
                </Hand>
                <Hand points={playerPoints}>
                    {playerHand.map((card, index) => (
                        <Card value={card} key={index} />
                    ))}
                </Hand>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <Chip value={1} onBet={bet} />
                    <Chip value={2} onBet={bet} color="blue" />
                    <Chip value={5} onBet={bet} color="green" />
                    <Chip value={10} onBet={bet} color="red" />
                    <Chip value={25} onBet={bet} color="black" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <Button
                            onClick={dealFirstCards}
                            disabled={
                                !canDeal ||
                                currentBet === 0 ||
                                currentBet > balance
                            }
                        >
                            Deal
                        </Button>
                        <Button onClick={stand} disabled={!canStandOrHit}>
                            Stand
                        </Button>
                        <Button onClick={hit} disabled={!canStandOrHit}>
                            Hit
                        </Button>
                    </div>
                    <Label>
                        Current Bet: <strong>£{currentBet.toFixed(2)}</strong>
                        <button className="ml-2 underline" onClick={resetBet}>
                            Reset
                        </button>
                    </Label>
                </div>
            </div>
            <PlayerBust
                isOpen={gameState === GameState.PlayerBust}
                onClose={lost}
            />
            <DealerBust
                isOpen={gameState === GameState.DealerBust}
                onClose={won}
            />
            <Push isOpen={gameState === GameState.Push} onClose={push} />
            <PlayerWon
                isOpen={gameState === GameState.PlayerWon}
                onClose={won}
            />
            <DealerWon
                isOpen={gameState === GameState.DealerWon}
                onClose={lost}
            />
        </main>
    );
}

export default App;
