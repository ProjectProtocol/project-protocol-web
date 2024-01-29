import { act, render } from '@testing-library/react'
import Paginator from 'src/components/Paginator'
import { mockIsIntersecting } from 'react-intersection-observer/test-utils'

type DummyItem = {
  id: string
  name: string
}

const dummyItems: DummyItem[] = new Array(25).fill(0).map((_, i) => {
  const id = String(i + 1)
  return {
    id,
    name: 'Dummy Item ' + id,
  }
})

describe('Paginator', () => {
  const defaultProps = {
    data: dummyItems.slice(0, 15),
    meta: { page: 0, totalPages: 2, total: 25 },
    getData: vitest.fn(),
    keyGenerator: (item: DummyItem) => `dummy-item-${item.id}`,
    ItemComponent: ({ item }: { item: DummyItem }) => <div>{item.name}</div>,
  }

  function renderPaginator(props = defaultProps) {
    return render(<Paginator<DummyItem> {...props} />)
  }

  it('renders without crashing', () => {
    renderPaginator()
  })

  it("renders the ItemComponent for each item in the data prop's array", () => {
    const { getByText } = renderPaginator()
    expect(getByText('Dummy Item 15')).toBeInTheDocument()
  })

  describe('When current page is not the last page', () => {
    it('calls getData for the next page', async () => {
      const mockGetData = vi.fn().mockResolvedValue({
        data: dummyItems.slice(15),
        meta: { page: 1, totalPages: 2, total: 25 },
      })

      const { getByTestId } = renderPaginator({
        ...defaultProps,
        getData: mockGetData,
      })

      await act(() => {
        mockIsIntersecting(getByTestId('observer-target'), true)
      })

      expect(mockGetData).toHaveBeenCalledWith(1)
    })

    it("appends the data from the next page to the data prop's array", async () => {
      const mockGetData = vi.fn().mockResolvedValue({
        data: dummyItems.slice(15),
        meta: { page: 1, totalPages: 2, total: 25 },
      })

      const { getByTestId, queryByText } = renderPaginator({
        ...defaultProps,
        getData: mockGetData,
      })

      await act(() => {
        mockIsIntersecting(getByTestId('observer-target'), true)
      })

      expect(queryByText('Dummy Item 25')).toBeInTheDocument
    })
  })

  describe('When current page is the last page', () => {
    it("doesn't call getData", async () => {
      const mockGetData = vi.fn()

      const { getByTestId, queryByText } = renderPaginator({
        ...defaultProps,
        getData: mockGetData,
        meta: { page: 1, totalPages: 2, total: 25 },
      })

      await act(() => {
        mockIsIntersecting(getByTestId('observer-target'), 1)
      })

      expect(mockGetData).not.toHaveBeenCalled()
      expect(queryByText('Dummy Item 25')).not.toBeInTheDocument
    })
  })
})
