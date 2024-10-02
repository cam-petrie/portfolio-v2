import { animated, useSpring } from "@react-spring/three";


const Spin = ({children}) => {
    console.log(children);

    const rotation = useSpring({
        from: { rotation: [0, 0, 0] },
        to: { rotation: [0, Math.PI * 2, 0] },
        config: { duration: 2000 },
    });
    
    return (
        <animated.group rotation={rotation}>
        {children}
        </animated.group>
    );
}

export default Spin;