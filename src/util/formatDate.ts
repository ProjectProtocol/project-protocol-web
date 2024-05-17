export default function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
