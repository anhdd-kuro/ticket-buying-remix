import moment from 'moment-timezone'
import type { Event } from 'react-big-calendar'

export type MovieClient = {
  id: string
  handle: string
  title: string
  description: string
  releaseDate: string
  publication_end_date: string
  original_title: string
  original_showtime_year: string
  country_of_production: string
  lens: string
  rated: string
  length: string
  director: string
  stars: string
  thumbnail: {
    image: {
      url: string
      altText: string
    }
  }
  products: {
    nodes: {
      id: string
      title: string
      handle: string
    }[]
  }
}

export type AdditionalData = {
  id: number
  screenId: number
  isActive: boolean
  isProduct: boolean
  lens: string
}

export type Movie = Omit<Event, 'resource'> & {
  resource: AdditionalData
}

function makeDateTime(
  timeFrame: 'past' | 'future' | 'today',
  options: {
    amount?: number
    unit?: moment.unitOfTime.DurationConstructor
    hour?: number
    minute?: number
  }
): Date {
  const now = moment()
  const hour = options.hour || 0
  const minute = options.minute || 0

  if (timeFrame === 'past') {
    return now
      .subtract(options.amount, options.unit)
      .hour(hour)
      .minute(minute)
      .toDate()
  }

  if (timeFrame === 'future') {
    return now
      .add(options.amount, options.unit)
      .hour(hour)
      .minute(minute)
      .toDate()
  }

  return now.hour(hour).minute(minute).toDate()
}

export const initialData: Movie[] = [
  {
    resource: {
      id: 1,
      isActive: true,
      isProduct: true,
      screenId: 0,
      lens: 'CS',
    },
    title: 'The Shawshank Redemption',
    start: makeDateTime('future', {
      amount: 2,
      unit: 'days',
      hour: 10,
      minute: 0,
    }),
    end: makeDateTime('future', {
      amount: 2,
      unit: 'days',
      hour: 12,
      minute: 0,
    }),
  },
  {
    resource: {
      id: 2,
      isActive: false,
      isProduct: false,
      screenId: 0,
      lens: 'CS',
    },
    title: 'The Godfather',
    start: makeDateTime('today', {
      hour: 16,
      minute: 0,
    }),
    end: makeDateTime('today', {
      hour: 18,
      minute: 0,
    }),
  },
  {
    resource: {
      id: 3,
      isActive: true,
      isProduct: true,
      screenId: 0,
      lens: 'CS',
    },
    title: 'The Dark Knight',
    start: makeDateTime('today', { hour: 18, minute: 0 }),
    end: makeDateTime('today', { hour: 20, minute: 0 }),
  },
  {
    resource: {
      id: 13,
      isActive: true,
      isProduct: true,
      screenId: 0,
      lens: 'VV',
    },
    title: 'Spider man',
    start: makeDateTime('today', { hour: 14, minute: 0 }),
    end: makeDateTime('today', { hour: 16, minute: 0 }),
  },
  {
    resource: {
      id: 4,
      isActive: true,
      isProduct: true,
      screenId: 0,
      lens: 'CS',
    },
    title: '12 Angry Men',
    start: makeDateTime('future', {
      amount: 4,
      unit: 'days',
      hour: 10,
      minute: 0,
    }),
    end: makeDateTime('future', {
      amount: 4,
      unit: 'days',
      hour: 12,
      minute: 0,
    }),
  },
  {
    resource: {
      id: 5,
      isActive: false,
      isProduct: true,
      screenId: 0,
      lens: 'CS',
    },
    title: "Schindler's List",
    start: makeDateTime('today', {
      amount: 5,
      unit: 'days',
      hour: 9,
      minute: 0,
    }),
    end: makeDateTime('today', {
      amount: 5,
      unit: 'days',
      hour: 12,
      minute: 0,
    }),
  },
  {
    resource: {
      id: 6,
      isActive: true,
      isProduct: true,
      screenId: 0,
      lens: 'CS',
    },
    title: 'The Lord of the Rings: The Return of the King',
    start: makeDateTime('past', {
      amount: 1,
      unit: 'days',
      hour: 18,
      minute: 0,
    }),
    end: makeDateTime('past', { amount: 1, unit: 'days', hour: 20, minute: 0 }),
  },
  {
    resource: {
      id: 7,
      isActive: true,
      isProduct: true,
      screenId: 0,
      lens: 'CS',
    },
    title: 'Pulp Fiction',
    start: makeDateTime('past', {
      amount: 2,
      unit: 'days',
      hour: 10,
      minute: 0,
    }),
    end: makeDateTime('past', { amount: 2, unit: 'days', hour: 12, minute: 0 }),
  },
  {
    resource: {
      id: 8,
      isActive: true,
      isProduct: true,
      screenId: 0,
      lens: 'VV',
    },
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    start: makeDateTime('past', {
      amount: 4,
      unit: 'days',
      hour: 14,
      minute: 0,
    }),
    end: makeDateTime('past', { amount: 4, unit: 'days', hour: 16, minute: 0 }),
  },
  {
    resource: {
      id: 9,
      isActive: false,
      isProduct: true,
      screenId: 0,
      lens: 'CS',
    },
    title: 'Forrest Gump',
    start: makeDateTime('past', {
      amount: 3,
      unit: 'days',
      hour: 18,
      minute: 0,
    }),
    end: makeDateTime('past', { amount: 3, unit: 'days', hour: 20, minute: 0 }),
  },
  {
    resource: {
      id: 10,
      isActive: false,
      isProduct: true,
      screenId: 0,
      lens: 'CS',
    },
    title: 'Inception',
    start: makeDateTime('past', {
      amount: 2,
      unit: 'days',
      hour: 10,
      minute: 0,
    }),
    end: makeDateTime('past', {
      amount: 2,
      unit: 'days',
      hour: 12,
      minute: 0,
    }),
  },
  {
    resource: {
      id: 11,
      isActive: true,
      isProduct: true,
      screenId: 0,
      lens: 'CS',
    },
    title: 'Future Event',
    start: makeDateTime('future', {
      amount: 1,
      unit: 'days',
      hour: 10,
      minute: 0,
    }),
    end: makeDateTime('future', {
      amount: 1,
      unit: 'days',
      hour: 12,
      minute: 0,
    }),
  },
  {
    resource: {
      id: 12,
      isActive: true,
      isProduct: true,
      screenId: 0,
      lens: 'CS',
    },
    title: 'Another Future Event',
    start: makeDateTime('future', {
      amount: 2,
      unit: 'days',
      hour: 14,
      minute: 0,
    }),
    end: makeDateTime('future', {
      amount: 2,
      unit: 'days',
      hour: 16,
      minute: 0,
    }),
  },
]
