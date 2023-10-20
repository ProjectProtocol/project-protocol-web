export default function resourceCategoryColor(category: string) {
  switch (category) {
    case 'Supportive services':
    case 'Mental health services':
      return `bg-rating-1 text-light`
    case 'Education services':
      return 'bg-rating-2 text-light'
    case 'Legal services':
      return 'bg-gray-4 text-light'
    case 'Housing services':
      return 'bg-secondary text-light'
    default:
      return 'bg-info'
  }
}
