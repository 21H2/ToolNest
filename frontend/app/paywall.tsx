import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../src/context/AppContext';
import { colors, fontSize, spacing, radius, shadows } from '../src/constants/theme';

const valueProps = [
  { icon: 'zap', text: 'Unlimited access to all tools' },
  { icon: 'clock', text: 'No daily usage limits' },
  { icon: 'star', text: 'Priority processing speed' },
  { icon: 'shield', text: 'Ad-free experience' },
  { icon: 'gift', text: 'Early access to new tools' },
];

export default function PaywallScreen() {
  const router = useRouter();
  const { upgradeToPro } = useApp();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    upgradeToPro();
    setLoading(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} testID="paywall-screen">
      {/* Close */}
      <View style={styles.topBar}>
        <TouchableOpacity
          testID="paywall-close-btn"
          style={styles.closeBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Feather name="x" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.proBadge}>
            <Feather name="star" size={24} color="#F59E0B" />
          </View>
          <Text style={styles.heroTitle}>Upgrade to Pro</Text>
          <Text style={styles.heroSubtitle}>
            Unlock unlimited access to all tools and supercharge your productivity.
          </Text>
        </View>

        {/* Value Props */}
        <View style={styles.propsCard}>
          {valueProps.map((prop, i) => (
            <View key={i} style={styles.propRow}>
              <View style={styles.propIconWrap}>
                <Feather name={prop.icon as any} size={16} color={colors.accent} />
              </View>
              <Text style={styles.propText}>{prop.text}</Text>
            </View>
          ))}
        </View>

        {/* Plan Toggle */}
        <View style={styles.planToggle}>
          <TouchableOpacity
            testID="plan-monthly-btn"
            style={[
              styles.planOption,
              selectedPlan === 'monthly' && styles.planOptionActive,
            ]}
            activeOpacity={0.7}
            onPress={() => setSelectedPlan('monthly')}
          >
            <Text
              style={[
                styles.planLabel,
                selectedPlan === 'monthly' && styles.planLabelActive,
              ]}
            >
              Monthly
            </Text>
            <Text
              style={[
                styles.planPrice,
                selectedPlan === 'monthly' && styles.planPriceActive,
              ]}
            >
              {'\u20B9'}99/mo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="plan-yearly-btn"
            style={[
              styles.planOption,
              selectedPlan === 'yearly' && styles.planOptionActive,
            ]}
            activeOpacity={0.7}
            onPress={() => setSelectedPlan('yearly')}
          >
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>SAVE 33%</Text>
            </View>
            <Text
              style={[
                styles.planLabel,
                selectedPlan === 'yearly' && styles.planLabelActive,
              ]}
            >
              Yearly
            </Text>
            <Text
              style={[
                styles.planPrice,
                selectedPlan === 'yearly' && styles.planPriceActive,
              ]}
            >
              {'\u20B9'}799/yr
            </Text>
          </TouchableOpacity>
        </View>

        {/* Subscribe Button */}
        <TouchableOpacity
          testID="subscribe-btn"
          style={styles.subscribeBtn}
          activeOpacity={0.7}
          onPress={handleSubscribe}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.textInverted} />
          ) : (
            <Text style={styles.subscribeBtnText}>
              Subscribe — {selectedPlan === 'monthly' ? '\u20B999/month' : '\u20B9799/year'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Restore */}
        <TouchableOpacity
          testID="restore-btn"
          style={styles.restoreBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Payment will be charged to your Google Play account. Subscription automatically
          renews unless cancelled at least 24 hours before the end of the current period.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    alignItems: 'flex-end',
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
    marginTop: spacing.lg,
  },
  proBadge: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  heroTitle: {
    fontSize: fontSize['3xl'],
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.8,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
  },
  propsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    marginBottom: spacing['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
  },
  propRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  propIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  propText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.textPrimary,
    flex: 1,
  },
  planToggle: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  planOption: {
    flex: 1,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.background,
  },
  planOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  planLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  planLabelActive: {
    color: colors.textPrimary,
  },
  planPrice: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.textTertiary,
    letterSpacing: -0.5,
  },
  planPriceActive: {
    color: colors.textPrimary,
  },
  saveBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    marginBottom: 4,
  },
  saveBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textInverted,
    letterSpacing: 0.5,
  },
  subscribeBtn: {
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  subscribeBtnText: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.textInverted,
  },
  restoreBtn: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.xl,
  },
  restoreText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  disclaimer: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
