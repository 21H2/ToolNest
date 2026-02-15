export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const tools: Tool[] = [
  {
    id: 'summary',
    name: 'Summary AI',
    description: 'Notes to smart summaries',
    icon: 'file-text',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
  },
  {
    id: 'pdf-merge',
    name: 'PDF Merge',
    description: 'Combine multiple PDFs',
    icon: 'layers',
    color: '#EA580C',
    bgColor: '#FFF7ED',
  },
  {
    id: 'pdf-compress',
    name: 'PDF Compress',
    description: 'Reduce PDF file size',
    icon: 'minimize-2',
    color: '#059669',
    bgColor: '#ECFDF5',
  },
  {
    id: 'resume',
    name: 'Resume Fix',
    description: 'AI-powered resume improver',
    icon: 'briefcase',
    color: '#DB2777',
    bgColor: '#FDF2F8',
  },
  {
    id: 'bg-remove',
    name: 'BG Remover',
    description: 'Remove image backgrounds',
    icon: 'image',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
  },
];
