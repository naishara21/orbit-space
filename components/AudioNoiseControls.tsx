import React, { useEffect, useRef, useState } from 'react';
import { Bird, CloudRainWind, FlameKindling, Pause, Play, SlidersVertical, Trees, Waves, Zap, ZapOff } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { animationClass } from '@/lib/utils';
import { Button } from './ui/button';
import { useAppStore } from '@/(store)/App';
import { TbWindmill } from "react-icons/tb";

export const audioSource = [
    {
        icon: <TbWindmill className='w-6 h-6' />,
        name: 'home',
        source: '/background-noises/Wind Chimes Four Notes A.wav',
        initialVolume: 0.8,
    },
    {
        icon: <CloudRainWind className='w-6 h-6' />,
        name: 'rain',
        source: '/background-noises/mixkit-light-rain-loop-1253.wav',
        initialVolume: 0.1,
    },
    {
        icon: <Zap className='w-6 h-6' />,
        name: 'thunder',
        source: '/background-noises/Thunderstorm and Clear Rain.wav',
        initialVolume: 0.5,
    },
    {
        icon: <FlameKindling className='w-6 h-6' />,
        name: 'campfire',
        source: "/background-noises/mixkit-campfire-crackles-1330.wav",
        initialVolume: 0.6,
    },
    {
        icon: <Trees className='w-6 h-6' />,
        name: 'forest',
        source: "/background-noises/mixkit-forest-birds-ambience-1210.wav",
        initialVolume: 0.2,
    },
    {
        icon: <Waves className='w-6 h-6' />,
        name: 'waterflow',
        source: '/background-noises/mixkit-water-flowing-ambience-loop-3126.wav',
        initialVolume: 0,
    },
];


const AudioNoiseControls = ({ disabled }: { disabled?: boolean }) => {
    const audioRefs = useRef<HTMLAudioElement[]>([]);
    const { backgroundVolumes, setBackgroundVolumes } = useAppStore();
    const [isPlaying, setIsPlaying] = useState(false)

    // useEffect(() => {
    //     audioSource.forEach((audio, i) => {
    //         setBackgroundVolumes(audio.initialVolume, i);
    //     });
    // }, [setBackgroundVolumes]);

    useEffect(() => {
        if (audioRefs.current) {
            audioRefs.current.forEach((ref, index) => {
                if (ref) {
                    ref.volume = backgroundVolumes[index]
                    if (isPlaying) {
                        ref.play();
                    } else {
                        ref.pause();
                    }
                }
            })
        }
    }, [backgroundVolumes, isPlaying, setBackgroundVolumes]);

    // useEffect(() => {
    //     if (audioRef.current) {
    //         audioRef.current.src = currentSrc;
    //         audioRef.current.play();
    //     }
    // }, [currentSrc]);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setBackgroundVolumes(newVolume, index);
    };

    return (
        <div className='flex lg:flex-row flex-col-reverse gap-4'>
            <Popover>
                {audioSource.map((audio, index) => (
                    <audio key={index} ref={(el: any) => audioRefs.current[index] = el} loop autoPlay>
                        <source src={audio.source} type='audio/wav' />
                    </audio>
                ))}
                <PopoverTrigger>
                    <span className='bg-black/20 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-black/20'>
                        <SlidersVertical strokeWidth={2} size={20} className='text-white group-hover:scale-110 duration-300 min-w-5 min-h-5 ' />
                    </span>
                </PopoverTrigger>
                <PopoverContent className={`bg-black/40 backdrop-blur-xl shadow-lg m-4 flex flex-col gap-2 dark rounded-lg ${animationClass}`}>
                    {/* dynamic player */}
                    {audioSource.map((audio, index) => (
                        <div key={index} className='flex items-center gap-4 mb-2'>
                            <button className=' w-20 flex flex-row justify-between gap-2 items-center'>
                                <p className='font-base text-xs w-full text-start'>{audio.name}</p>
                                {audio.icon}
                            </button>
                            <input
                                type='range'
                                min='0'
                                max='1'
                                step='0.01'
                                value={backgroundVolumes[index]}
                                onChange={(e) => handleVolumeChange(index, e)}
                                className='w-full'
                            />
                        </div>
                    ))}
                </PopoverContent>
            </Popover>
            <Button
                onClick={togglePlayPause}
                className='bg-black/20 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-black/20'>
                {isPlaying ?
                    <Pause strokeWidth={2} size={20} className='text-white group-hover:scale-110 duration-300 min-w-5 min-h-5 ' /> :
                    <Play strokeWidth={2} size={20} className='text-white group-hover:scale-110 duration-300 min-w-5 min-h-5 ' />
                }
            </Button>
        </div>
    )
}

export default AudioNoiseControls;