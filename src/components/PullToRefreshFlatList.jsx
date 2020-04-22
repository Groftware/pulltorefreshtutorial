import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  fillParent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  refreshHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PullToRefreshFlatList = (props) => {
  const {
    refreshingHeight,
    data,
    renderItem,
    isRefreshing,
    onRefresh,
    RefreshHeader,
    ListEmptyComponent,
    ListHeaderComponent,
    onPercentageChange,
    backgroundColor,
    contentContainerStyle,
  } = props;

  const [offsetY, setOffsetY] = useState(0);
  const [animPaddingTop] = useState(new Animated.Value(0));

  // Run animate show header
  const showLoadingAnimation = (
    endCallback = () => { },
  ) => {
    Animated.timing(animPaddingTop, {
      toValue: refreshingHeight,
      // Immediately appears
      duration: 0,
      easing: Easing.out(Easing.ease),
    }).start(endCallback);
  };

  // Run animate hide header
  const hideLoadingAnimation = (
    endCallback = () => { },
  ) => {
    Animated.timing(animPaddingTop, {
      toValue: 0,
      duration: 400,
      easing: Easing.elastic(1.3),
    }).start(endCallback);
  };

  // Hide refreshing animation when is not refreshing.
  useEffect(() => {
    if (isRefreshing) {
      showLoadingAnimation();
    } else {
      hideLoadingAnimation();
    }
  }, [isRefreshing]);

  const readyToRefresh = () => offsetY <= -refreshingHeight;

  const handleRelease = (e) => {
    if (readyToRefresh() && !isRefreshing) {
      onRefresh();
    }
  };

  const onScroll = ({ nativeEvent }) => {
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;

    // Only toggle percent callback when scrolling down
    if (y < 0 && !isRefreshing) {
      const animPercent = y / -refreshingHeight;
      onPercentageChange(animPercent);
    }
    setOffsetY(y);
  };

  return (
    <View style={{ ...styles.scrollview, backgroundColor }}>
      <View
        style={{
          ...styles.fillParent,
        }}
      >
        <View
          style={{
            ...styles.refreshHeaderContainer,
            height: refreshingHeight,
          }}
        >
          {RefreshHeader}
        </View>
      </View>
      <Animated.View
        style={{
          flex: 1,
          paddingTop: animPaddingTop,
        }}
      >
        <FlatList
          contentContainerStyle={contentContainerStyle}
          ListEmptyComponent={ListEmptyComponent}
          ListHeaderComponent={ListHeaderComponent}
          data={data}
          renderItem={renderItem}
          scrollEventThrottle={1}
          onScroll={onScroll}
          onResponderRelease={handleRelease}
        />
      </Animated.View>
    </View>
  );
};

PullToRefreshFlatList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderItem: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onPercentageChange: PropTypes.func.isRequired,

  refreshingHeight: PropTypes.number,
  ListHeaderComponent: PropTypes.object,
  ListEmptyComponent: PropTypes.object,
  backgroundColor: PropTypes.string,
  contentContainerStyle: PropTypes.object,
};

PullToRefreshFlatList.defaultProps = {
  refreshingHeight: 100,
  backgroundColor: 'transparent',
  contentContainerStyle: {},
  ListHeaderComponent: null,
  ListEmptyComponent: null,
};

export default PullToRefreshFlatList;
