import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, shadows, fontSize, spacing } from '../constants/theme';
import { Tool } from '../constants/tools';

interface ToolCardProps {
  tool: Tool;
  onPress: () => void;
}

export default function ToolCard({ tool, onPress }: ToolCardProps) {
  return (
    <TouchableOpacity
      testID={`tool-card-${tool.id}`}
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: tool.bgColor }]}>
        <Feather name={tool.icon as any} size={24} color={tool.color} />
      </View>
      <Text style={styles.name} numberOfLines={1}>{tool.name}</Text>
      <Text style={styles.description} numberOfLines={2}>{tool.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
    flex: 1,
    minHeight: 148,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
