
import React, { useState } from 'react';
import { supabase } from '../src/lib/supabase';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../src/context/AppContext';
import { colors, fontSize, spacing, radius, shadows } from '../src/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

const handleGoogleLogin = async () => {
  setLoading(true);

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.log('Login error:', error.message);
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container} testID="login-screen">
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoBg}>
            <Feather name="box" size={32} color={colors.background} />
          </View>
          <Text style={styles.title}>Welcome to{'\n'}ToolNest</Text>
          <Text style={styles.subtitle}>
            Your essential digital workshop.{'\n'}Tools that simplify your workflow.
          </Text>
        </View>

        <View style={styles.features}>
          {[
            { icon: 'zap', text: 'AI-powered summaries & resume fixes' },
            { icon: 'file', text: 'PDF merge & compress in seconds' },
            { icon: 'image', text: 'Background removal made easy' },
          ].map((item, i) => (
            <View key={i} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Feather name={item.icon as any} size={16} color={colors.accent} />
              </View>
              <Text style={styles.featureText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          testID="google-sign-in-btn"
          style={styles.googleButton}
          activeOpacity={0.7}
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.textInverted} />
          ) : (
            <>
              <View style={styles.googleIconWrap}>
                <Text style={styles.googleLetter}>G</Text>
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing['3xl'],
  },
  logoBg: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['2xl'],
  },
  title: {
    fontSize: fontSize['3xl'],
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.8,
    lineHeight: 38,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  features: {
    gap: spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  bottom: {
    paddingBottom: spacing['3xl'],
    gap: spacing.lg,
  },
  googleButton: {
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    ...shadows.medium,
  },
  googleIconWrap: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLetter: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  googleButtonText: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.textInverted,
  },
  terms: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
});
