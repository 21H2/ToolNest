import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, fontSize, spacing } from '../src/constants/theme';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container} testID="splash-screen">
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBg}>
            <Feather name="box" size={36} color={colors.background} />
          </View>
        </View>
        <Text style={styles.title}>ToolNest</Text>
        <Text style={styles.tagline}>The Essential Digital Workshop</Text>
      </View>
      <ActivityIndicator
        testID="splash-loader"
        size="small"
        color={colors.textTertiary}
        style={styles.loader}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: spacing.xl,
  },
  logoBg: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize['4xl'],
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -1,
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  loader: {
    position: 'absolute',
    bottom: 60,
  },
});
