import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

const washHandsAnimation = require('../../assets/animations/bouncing-fruits.json');

// import { useSafeArea } from 'react-native-safe-area-context';
// import assets from '../../assets';
// import Colors from '../constants/Colors';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
    width: '100%',
  },
});

const RefreshHeader = (props) => {
  // const safeAreaInsets = useSafeArea();
  const lottieAnimation = React.useRef(null);

  const { progress, shouldPlayAnimation } = props;

  React.useEffect(() => {
    if (shouldPlayAnimation) {
      lottieAnimation.current.play();
    }
  }, [shouldPlayAnimation]);

  return (
    <View style={{
      ...styles.container,
      // paddingTop: safeAreaInsets.top,
    }}
    >
      <View style={styles.innerContainer}>
        <LottieView
          ref={lottieAnimation}
          style={{
            width: 100,
            height: 100,
          }}
          source={washHandsAnimation}
          progress={progress > 1 ? 1 : progress}
        />
      </View>
    </View>
  );
};

export default RefreshHeader;
