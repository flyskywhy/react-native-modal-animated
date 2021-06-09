import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, TouchableOpacity, StyleSheet} from 'react-native';
export interface AnimatedModalProps {
  noAnimation?: boolean;
  visible: boolean;
  animationType?: string;
  modalCardPosition?: string;
  style?: any;
  duration?: number;
  onBackdropPress: () => void;
}
export default function AnimatedModal(props: AnimatedModalProps) {
  const [visible, setVisible] = useState(props.visible);
  const visibility = useRef(new Animated.Value(props.isible ? 1 : 0));

  useEffect(() => {
    if (props.visible) {
      setVisible(true);
    }
    Animated.timing(visibility.current, {
      toValue: props.visible ? 1 : 0,
      easing: Easing.cubic,
      duration: props.duration ? props.duration : 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(props.visible);
    });
  }, [props.visible, props.duration]);

  const {style, children, ...rest} = props;

  let containerStyle, positionStyle;

  const defaultAnimationStyle = {
    opacity: visibility.current.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: visibility.current.interpolate({
          inputRange: [0, 1],
          outputRange: [1.1, 1],
        }),
      },
    ],
  };

  const varticalFlipAnimation = {
    opacity: visibility.current.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        rotateX: visibility.current.interpolate({
          inputRange: [0, 1],
          outputRange: ['270deg', '360deg'],
        }),
      },
    ],
  };

  const flipAndScaleAnimation = {
    opacity: visibility.current.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        rotateX: visibility.current.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
      {
        scale: visibility.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  };

  const horizontalFlipAnimation = {
    opacity: visibility.current.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        rotateY: visibility.current.interpolate({
          inputRange: [0, 1],
          outputRange: ['270deg', '360deg'],
        }),
      },
    ],
  };

  switch (props.animationType) {
    case 'vertical':
      containerStyle = varticalFlipAnimation;
      break;

    case 'horizontal':
      containerStyle = horizontalFlipAnimation;
      break;

    case 'flipAndScale':
      containerStyle = flipAndScaleAnimation;
      break;

    default:
      containerStyle = defaultAnimationStyle;
      break;
  }

  switch (props.modalCardPosition) {
    case 'center':
      positionStyle = styles.centerStyle;
      break;

    case 'bottom':
      positionStyle = styles.bottomStyle;
      break;

    case 'top':
      positionStyle = styles.topStyle;
      break;

    default:
      positionStyle = styles.centerStyle;
      break;
  }
  /** */

  const combinedStyle = [!props.noAnimation ? containerStyle : null, style];

  const layerStyle = {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: `rgba(0,0,0,0.5)`,
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onBackdropPress}
      style={visible ? layerStyle : null}>
      <Animated.View
        style={[visible ? combinedStyle : containerStyle, positionStyle]}
        {...rest}>
        {visible ? children : null}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centerStyle: {
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomStyle: {
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topStyle: {
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
