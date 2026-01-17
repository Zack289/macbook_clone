import { PresentationControls } from '@react-three/drei';
import React, { useRef } from 'react'
import MacbookModel16 from '../models/Macbook-16';
import MacbookModel14 from '../models/Macbook-14';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity)=>{
    if(!group) return;

    group.traverse((child)=>{
        if(child.isMesh){
            child.material.transparent = true;
            gsap.to(child.material, {opacity, duration: ANIMATION_DURATION})
        }
    })
}

const moveGroup = (group, x)=>{
    if(!group) return;

    gsap.to(group.position, {x, duration: ANIMATION_DURATION})
}



function ModelSwitcher({isMobile, scale}) {

    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_LARGE_MOBILE = 0.05;

    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();

    const showlargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    useGSAP(()=>{
        if(showlargeMacbook){
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);

            fadeMeshes(smallMacbookRef.current, 0);
            fadeMeshes(largeMacbookRef.current, 1);
        }
        else{
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(largeMacbookRef.current, 0);
        }
        
    }, [scale])

    const controlsConfig = {
        snap: true,  //it will set the initial position of the laptop after rotating manually
        speed: 1,
        zoom: 1,
        // polar:  [-Math.PI, Math.PI],  // allow us to see the laptop from below too
        azimuth: [-Infinity, Infinity],  //allows to rotate as much we want
        config : {mass: 1, tension: 0, friction: 26}
    }
  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
            <MacbookModel16 scale={isMobile ? 0.05 : 0.08}/>
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
            <MacbookModel14 scale={isMobile ? 0.03 : 0.06}/>
        </group>
      </PresentationControls>
    </>
  )
}

export default ModelSwitcher
