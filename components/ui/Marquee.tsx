import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
    SharedValue,
    useAnimatedStyle,
    useFrameCallback,
    useSharedValue,
} from 'react-native-reanimated';


interface MeasureElementProps extends PropsWithChildren {
    onLayout: (width: number) => void
}
const MeasureElement = ({ onLayout, children }: MeasureElementProps) => (
    <Animated.ScrollView
        horizontal
        style={marqueeStyles.hidden}
        pointerEvents="box-none">
        <View onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>
            {children}
        </View>
    </Animated.ScrollView>
);

interface TranslatedElementProps extends PropsWithChildren {
    index: number,
    offset: SharedValue<number>,
    childrenWidth: number
}
const TranslatedElement = ({ index, children, offset, childrenWidth }: TranslatedElementProps) => {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            left: (index - 1) * childrenWidth,
            transform: [
                {
                    translateX: -offset.value,
                },
            ],
        };
    });
    return (
        <Animated.View style={[styles.animatedStyle, animatedStyle]}>
            {children}
        </Animated.View>
    );
};

const getIndicesArray = (length: number) => Array.from({ length }, (_, i) => i);

interface ClonerProps {
    renderChild: (index: any) => React.JSX.Element,
    count: number
}
const Cloner = ({ count, renderChild }: ClonerProps) => (
    <>{getIndicesArray(count).map(renderChild)}</>
);


interface ChildrenScrollerProps extends PropsWithChildren {
    duration: number,
    childrenWidth: number,
    parentWidth: number,
    reverse: boolean,
}
const ChildrenScroller = ({
    duration,
    childrenWidth,
    parentWidth,
    reverse,
    children,
}: ChildrenScrollerProps) => {
    const offset = useSharedValue(0);
    const coeff = useSharedValue(reverse ? 1 : -1);

    React.useEffect(() => {
        coeff.value = reverse ? 1 : -1;
    }, [reverse]);

    useFrameCallback((i) => {
        // prettier-ignore
        offset.value += (coeff.value * ((i.timeSincePreviousFrame ?? 1) * childrenWidth)) / duration;
        offset.value = offset.value % childrenWidth;
    }, true);

    const count = Math.round(parentWidth / childrenWidth) + 2;
    const renderChild = (index: number) => (
        <TranslatedElement
            key={`clone-${index}`}
            index={index}
            offset={offset}
            childrenWidth={childrenWidth}>
            {children}
        </TranslatedElement>
    );

    return <Cloner count={count} renderChild={renderChild} />;
};



interface MarqueeProps extends PropsWithChildren {
    duration?: number,
    reverse?: boolean,
    style?: StyleProp<ViewStyle>
}

export const Marquee = ({ duration = 3000, reverse = false, children, style }: MarqueeProps) => {
    const [parentWidth, setParentWidth] = React.useState(0);
    const [childrenWidth, setChildrenWidth] = React.useState(0);

    
    return (
        <View
            style={style}
            onLayout={(ev) => {
                setParentWidth(ev.nativeEvent.layout.width);
            }}
            pointerEvents="box-none">
            <View style={marqueeStyles.row} pointerEvents="box-none">
                <MeasureElement onLayout={setChildrenWidth}>{children}</MeasureElement>

                {childrenWidth > 0 && parentWidth > 0 && (
                    <ChildrenScroller
                        duration={duration}
                        parentWidth={parentWidth}
                        childrenWidth={childrenWidth}
                        reverse={reverse}>
                        {children}
                    </ChildrenScroller>
                )}
            </View>
        </View>
    );
};

const marqueeStyles = StyleSheet.create({
    hidden: { opacity: 0, zIndex: -1 },
    row: { flexDirection: 'row', overflow: 'hidden' },
});

// function MarqueeScreen() {
//     const [reverse, setReverse] = useState(false);
//     return (
//         <View style={styles.container}>
//             <View style={styles.safeArea}>
//                 <Button onPress={() => setReverse((v) => !v)} title="Reverse" />
//                 <Marquee reverse={reverse}>
//                     <Image
//                         style={styles.horseImage}
//                         source={{
//                             uri: 'https://docs.swmansion.com/react-native-reanimated/img/logo.svg',
//                         }}
//                     />
//                 </Marquee>
//             </View>
//         </View>
//     );
// }

const styles = StyleSheet.create({
    animatedStyle: {
        position: 'absolute',
    },
    circle: {
        marginTop: 4,
        borderRadius: 100,
        height: 120,
        width: 160,
        backgroundColor: '#b58df1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
