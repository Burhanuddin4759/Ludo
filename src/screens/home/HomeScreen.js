import { Alert, Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Wrapper from '../../components/reusable/Wrapper'
import Logo from '../../assets/images/logo.png'
import { HEIGHT, WIDTH } from '../../enums/StyleGuides'
import GradientButton from '../../components/reusable/CustomButton'
import { ArrowPathIcon, PlayIcon, UserGroupIcon, UsersIcon } from 'react-native-heroicons/outline'
import LottieView from 'lottie-react-native'
import Witch from '../../assets/animation/witch.json'
import { RFValue } from 'react-native-responsive-fontsize'
import { playSound } from '../../helpers/SoundUtility'
import { useIsFocused } from '@react-navigation/native'
import SoundPlayer from 'react-native-sound-player'
import { navigate } from '../../utils/NavigationUtils'
import { useDispatch, useSelector } from 'react-redux'
import { resetGame } from '../../redux/reducers/gameSlice'
import { selectIsGameInProgress } from '../../redux/reducers/gameSelector'

const HomeScreen = () => {

  const [loading, setLoading] = useState(false)
  const witchAnim = useRef(new Animated.Value(-WIDTH)).current;
  const scaleXAnim = useRef(new Animated.Value(-1)).current;
  const loopRef = useRef(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isGameInProgress = useSelector(selectIsGameInProgress);


  useEffect(() => {
    if (isFocused) {
      playSound('home');
    }
  }, [isFocused])

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        // fly in from off-screen left, facing right
        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: WIDTH * 0.02,
            duration: 2000,
            useNativeDriver: true
          }),
          Animated.timing(scaleXAnim, {
            toValue: -1,
            duration: 0,
            useNativeDriver: true
          })
        ]),
        Animated.delay(3000),
        // continue right, off-screen
        Animated.timing(witchAnim, {
          toValue: WIDTH * 2,
          duration: 6000,
          useNativeDriver: true
        }),
        // snap instantly while off-screen, flip to face left
        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: -WIDTH * 0.05,
            duration: 0,
            useNativeDriver: true
          }),
          Animated.timing(scaleXAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true
          })
        ]),
        Animated.delay(3000),
        // fly off-screen left
        Animated.timing(witchAnim, {
          toValue: -WIDTH * 2,
          duration: 6000,
          useNativeDriver: true
        }),
        // snap back to start position off-screen, ready to loop
        Animated.timing(witchAnim, {
          toValue: -WIDTH,
          duration: 0,
          useNativeDriver: true
        }),
      ])
    );

    loopRef.current = loop;
    loop.start();

    return () => {
      loopRef.current?.stop();
    };
  }, [witchAnim, scaleXAnim])

  const startGame = async (isNew = false) => {
    try {
      setLoading(true)
      if (isNew) {
        dispatch(resetGame())
      }
      SoundPlayer.stop();
      navigate('LudoBoard');
      playSound('game_start');
      // game start / navigation logic here
    } catch (err) {
      Alert.alert('Error', 'Could not start the game. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // const handleNewGame = useCallback(() => {
  //   startGame(true)
  // }, [])

  const handleNewGame = useCallback(() => {
    if (isGameInProgress) {
      Alert.alert(
        'Start New Game?',
        'You have a game in progress. Starting a new one will erase your current progress.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Start New', style: 'destructive', onPress: () => startGame(true) },
        ]
      )
      return
    }
    startGame(true)
  }, [isGameInProgress, startGame])

  const handleResume = useCallback(() => {
    startGame(false)
  }, [startGame])

  const handleComingSoon = useCallback(() => {
    Alert.alert('Coming Soon!', 'Click New Game')
  }, [])


  return (
    <Wrapper style={styles.container}>
      <Image
        source={Logo}
        style={styles.img}
        resizeMode='contain'
      />

      {isGameInProgress && (
        <GradientButton
          title="RESUME"
          icon={ArrowPathIcon}
          onPress={handleResume}
          loading={loading}
          colors={['#d4af37', '#a97a1f', '#7a5511']}
        />
      )}

      <GradientButton
        title="NEW GAME"
        icon={PlayIcon}
        onPress={handleNewGame}
        loading={loading}
      />
      <GradientButton
        title="VS CPU"
        icon={UserGroupIcon}
        disabled
        onPress={handleComingSoon}
      />
      <GradientButton
        title="2 VS 2"
        icon={UsersIcon}
        disabled
        onPress={handleComingSoon}
      />

      <Animated.View
        style={[styles.witchContainer, {
          transform: [{ translateX: witchAnim }, { scaleX: scaleXAnim }]
        }]}
        pointerEvents="none"
      >
        <Pressable
          onPress={() => {
            const random = Math.floor(Math.random() * 3) + 1;
            playSound(`girl${random}`)
          }}
        >
          <LottieView
            hardwareAccelerationAndroid
            source={Witch}
            autoPlay
            speed={1}
            style={styles.witch}
          />
        </Pressable>
      </Animated.View>

      <View style={styles.artistContainer}>
        <Text style={styles.artist}>Made By - Burhan ud din</Text>
      </View>
    </Wrapper>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  img: {
    width: WIDTH * 0.6,
    height: HEIGHT * 0.2,
    alignSelf: 'center',
    marginVertical: 50
  },
  witchContainer: {
    position: 'absolute',
    top: '60%',
    left: '25%',
  },
  witch: {
    height: RFValue(150),
    width: RFValue(150),
    transform: [{ rotate: '25deg' }],
  },
  artistContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  artist: {
    fontStyle: 'italic',
    opacity: 0.7,
    color: '#fff',
  }
})