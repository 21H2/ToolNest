import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../src/context/AppContext';
import ToolCard from '../src/components/ToolCard';
import { tools } from '../src/constants/tools';
import { colors, fontSize, spacing, radius, shadows } from '../src/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { userName, isPro, usageCount, maxFreeUsage, canUse, logout } = useApp();

  const firstName = userName.split(' ')[0];
  const usagePercent = isPro ? 0 : (usageCount / maxFreeUsage) * 100;

  const handleToolPress = (toolId: string) => {
    if (!canUse()) {
      router.push('/paywall');
      return;
    }
    router.push(`/tool/${toolId}`);
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container} testID="home-screen">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hey, {firstName}</Text>
            <Text style={styles.greetingSub}>What will you build today?</Text>
          </View>
          <TouchableOpacity
            testID="profile-btn"
            style={styles.profileBtn}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <Feather name="user" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Usage Card */}
        <View style={styles.usageCard} testID="usage-card">
          <View style={styles.usageHeader}>
            <View style={styles.usageLeft}>
              <Text style={styles.usageLabel}>DAILY USAGE</Text>
              {isPro ? (
                <Text style={styles.usageValue}>Unlimited</Text>
              ) : (
                <Text style={styles.usageValue}>
                  {usageCount} of {maxFreeUsage} free uses
                </Text>
              )}
            </View>
            {isPro ? (
              <View style={styles.proBadge}>
                <Feather name="star" size={12} color={colors.accentForeground} />
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
            ) : (
              <TouchableOpacity
                testID="upgrade-btn"
                style={styles.upgradeBtn}
                activeOpacity={0.7}
                onPress={() => router.push('/paywall')}
              >
                <Text style={styles.upgradeBtnText}>Upgrade</Text>
              </TouchableOpacity>
            )}
          </View>
          {!isPro && (
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${usagePercent}%` }]}
              />
            </View>
          )}
        </View>

        {/* Tools Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tools</Text>
          <Text style={styles.sectionCount}>{tools.length} available</Text>
        </View>

        <View style={styles.grid}>
          {tools.map((tool, index) => (
            <View
              key={tool.id}
              style={[
                styles.gridItem,
                index % 2 === 0 ? styles.gridItemLeft : styles.gridItemRight,
              ]}
            >
              <ToolCard tool={tool} onPress={() => handleToolPress(tool.id)} />
            </View>
          ))}
          {tools.length % 2 !== 0 && <View style={styles.gridItemPlaceholder} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: fontSize['2xl'],
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  greetingSub: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usageCard: {
    backgroundColor: colors.background,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing['2xl'],
    ...shadows.soft,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  usageLeft: {
    flex: 1,
  },
  usageLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textTertiary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  usageValue: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  proBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.accentForeground,
  },
  upgradeBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  upgradeBtnText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textInverted,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: radius.full,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  sectionCount: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%',
    marginBottom: spacing.md,
  },
  gridItemLeft: {
    paddingRight: spacing.sm / 2,
  },
  gridItemRight: {
    paddingLeft: spacing.sm / 2,
  },
  gridItemPlaceholder: {
    width: '50%',
  },
});
