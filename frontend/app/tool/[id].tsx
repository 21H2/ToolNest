import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import { tools } from '../../src/constants/tools';
import { colors, fontSize, spacing, radius, shadows } from '../../src/constants/theme';

export default function ToolScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { incrementUsage, canUse } = useApp();

  const tool = tools.find((t) => t.id === id);
  const [fileSelected, setFileSelected] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(false);

  if (!tool) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Tool not found</Text>
      </SafeAreaView>
    );
  }

  const handleUpload = () => {
    setFileSelected(true);
    setResult(false);
  };

  const handleProcess = async () => {
    if (!canUse()) {
      router.push('/paywall');
      return;
    }
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const allowed = incrementUsage();
    if (!allowed) {
      setProcessing(false);
      router.push('/paywall');
      return;
    }
    setProcessing(false);
    setResult(true);
  };

  const handleReset = () => {
    setFileSelected(false);
    setResult(false);
  };

  const getResultContent = () => {
    switch (tool.id) {
      case 'summary':
        return {
          title: 'Summary Generated',
          body: 'Your notes have been condensed into a clear, structured summary. Key points extracted and organized by topic for quick reference.',
        };
      case 'pdf-merge':
        return {
          title: 'PDFs Merged',
          body: 'All selected PDF files have been successfully combined into a single document. Ready for download.',
        };
      case 'pdf-compress':
        return {
          title: 'PDF Compressed',
          body: 'File size reduced by 68%. Original: 4.2 MB → Compressed: 1.3 MB. Quality preserved.',
        };
      case 'resume':
        return {
          title: 'Resume Improved',
          body: 'Your resume has been enhanced with stronger action verbs, better formatting, and optimized keywords for ATS systems.',
        };
      case 'bg-remove':
        return {
          title: 'Background Removed',
          body: 'Background successfully removed with clean edges. Transparent PNG ready for download.',
        };
      default:
        return { title: 'Done', body: 'Processing complete.' };
    }
  };

  const resultContent = getResultContent();

  return (
    <SafeAreaView style={styles.container} testID="tool-screen">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          testID="back-btn"
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{tool.name}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tool Icon */}
        <View style={styles.toolHeader}>
          <View style={[styles.toolIcon, { backgroundColor: tool.bgColor }]}>
            <Feather name={tool.icon as any} size={28} color={tool.color} />
          </View>
          <Text style={styles.toolDescription}>{tool.description}</Text>
        </View>

        {/* Upload Area */}
        {!result && (
          <TouchableOpacity
            testID="upload-area"
            style={[styles.uploadArea, fileSelected && styles.uploadAreaSelected]}
            activeOpacity={0.7}
            onPress={handleUpload}
          >
            {fileSelected ? (
              <View style={styles.fileInfo}>
                <View style={styles.fileIconWrap}>
                  <Feather name="file" size={20} color={tool.color} />
                </View>
                <View style={styles.fileDetails}>
                  <Text style={styles.fileName}>sample_document.pdf</Text>
                  <Text style={styles.fileSize}>2.4 MB</Text>
                </View>
                <TouchableOpacity
                  testID="remove-file-btn"
                  onPress={handleReset}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.uploadContent}>
                <View style={styles.uploadIconWrap}>
                  <Feather name="upload-cloud" size={28} color={colors.textTertiary} />
                </View>
                <Text style={styles.uploadText}>Tap to select a file</Text>
                <Text style={styles.uploadHint}>PDF, TXT, DOCX, PNG, JPG</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {/* Process Button */}
        {fileSelected && !result && (
          <TouchableOpacity
            testID="process-btn"
            style={[styles.processBtn, processing && styles.processBtnDisabled]}
            activeOpacity={0.7}
            onPress={handleProcess}
            disabled={processing}
          >
            {processing ? (
              <View style={styles.processingRow}>
                <ActivityIndicator size="small" color={colors.textInverted} />
                <Text style={styles.processBtnText}>Processing...</Text>
              </View>
            ) : (
              <Text style={styles.processBtnText}>Process File</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Result Area */}
        {result && (
          <View style={styles.resultCard} testID="result-card">
            <View style={styles.resultHeader}>
              <View style={styles.successBadge}>
                <Feather name="check-circle" size={16} color={colors.success} />
                <Text style={styles.successText}>{resultContent.title}</Text>
              </View>
            </View>
            <Text style={styles.resultBody}>{resultContent.body}</Text>
            <View style={styles.resultActions}>
              <TouchableOpacity
                testID="download-btn"
                style={styles.downloadBtn}
                activeOpacity={0.7}
              >
                <Feather name="download" size={16} color={colors.textInverted} />
                <Text style={styles.downloadBtnText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="new-file-btn"
                style={styles.newBtn}
                activeOpacity={0.7}
                onPress={handleReset}
              >
                <Text style={styles.newBtnText}>New File</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  headerRight: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  toolHeader: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  toolIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  toolDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radius.xl,
    padding: spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
  },
  uploadAreaSelected: {
    borderStyle: 'solid',
    borderColor: colors.accent,
    backgroundColor: '#FAFAFE',
    padding: spacing.lg,
  },
  uploadContent: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  uploadIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  uploadText: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  uploadHint: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
  },
  fileIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  fileSize: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    marginTop: 2,
  },
  processBtn: {
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  processBtnDisabled: {
    opacity: 0.7,
  },
  processingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  processBtnText: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.textInverted,
  },
  resultCard: {
    backgroundColor: colors.background,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
    gap: spacing.lg,
  },
  resultHeader: {
    flexDirection: 'row',
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  successText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.success,
  },
  resultBody: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  resultActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  downloadBtn: {
    flex: 1,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  downloadBtnText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textInverted,
  },
  newBtn: {
    flex: 1,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBtnText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
