import { initialData } from './schedule.data'
import {
  LateShowLabel,
  ScheduleForm,
  TicketTypes,
  OutsideDisplayView,
  Screen,
  Playlist,
} from './components'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { toast } from 'react-toastify'
import { Modal, Tabs } from '@shopify/polaris'
import clsx from 'clsx'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Select from 'react-select'
import moment from 'moment-timezone'
import { customAlphabet } from 'nanoid'
import type {
  Event,
  Formats,
  SlotInfo,
  ViewsProps,
  Messages,
} from 'react-big-calendar'
import type { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import type { Movie } from './schedule.data'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const formats: Formats = {
  agendaDateFormat: 'M月D日',
  agendaHeaderFormat: ({ start, end }, culture, local) =>
    `${local.format(start, 'YYYY年M月D日', culture)} - ${local.format(
      end,
      'YYYY年M月D日',
      culture
    )}`,
  agendaTimeRangeFormat: ({ start, end }, culture, local) =>
    `${local.format(start, 'HH:mm', culture)} - ${local.format(
      end,
      'HH:mm',
      culture
    )}`,
  dateFormat: 'D',
  dayFormat: 'D(ddd)',
  monthHeaderFormat: 'YYYY年M月',
  dayHeaderFormat: 'M月D日(ddd)',
  dayRangeHeaderFormat: ({ start, end }, culture, local) =>
    `${local.format(start, 'M月D日', culture)} - ${local.format(
      end,
      'M月D日',
      culture
    )}`,
}

const DnDCalendar = withDragAndDrop(Calendar)

export type Screen = {
  id: number
  name: string
  schedule: Movie[]
}

export const colors = [
  '#FFC300',
  '#3D9970',
  '#FF5733',
  '#0074D9',
  '#900C3F',
  '#72c5e6',
  '#581845',
  '#C70039',
]

export default function MovieCalendar() {
  const calendarWrapper = useRef<HTMLDivElement>(null)
  const [tabContentWrapper] = useAutoAnimate()

  const initialScreens = useRef<Screen[]>([
    {
      id: -1,
      name: 'シネマ未設定',
      schedule: [],
    },
    {
      id: 1,
      name: 'シネマ 1',
      schedule: initialData
        .slice(0, 4)
        .map((e) => ({ ...e, resource: { ...e.resource, screenId: 1 } })),
    },
    {
      id: 2,
      name: 'シネマ 2',
      schedule: initialData.slice(3, 7).map((e) => ({
        ...e,
        resource: { ...e.resource, screenId: 2 },
      })),
    },
    {
      id: 3,
      name: 'シネマ 3',
      schedule: initialData.slice(7, 9).map((e) => ({
        ...e,
        resource: { ...e.resource, screenId: 3 },
      })),
    },
    {
      id: 4,
      name: 'シネマ 4',
      schedule: initialData.slice(4, 9).map((e) => ({
        ...e,
        resource: { ...e.resource, screenId: 4 },
      })),
    },
  ])

  const {
    currentScreens,
    setCurrentScreens,
    selectedEvent,
    allEventsInScreens,
    handleEventClick,
    handleEventDrop,
    handleEventResize,
    setSelectedEvent,
    handleSelectSlot,
    deleteSelectedEvent,
  } = useDndCalendarEvents(initialScreens.current)

  const screensOptions = useMemo(
    () =>
      initialScreens.current.map((screen) => ({
        label: screen.name,
        value: screen.id,
      })),
    [initialScreens]
  )

  const setColor = (screenId: number) => {
    if (screenId === 1) return colors[0]

    if (screenId === 2) return colors[1]

    if (screenId === 3) return colors[2]

    if (screenId === 4) return colors[3]

    if (screenId === 5) return colors[4]

    if (screenId === 6) return colors[5]

    return 'gray'
  }

  const [selectedTab, setSelectedTab] = useState(0)

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelectedTab(selectedTabIndex),
    []
  )

  return (
    <div className="h-full py-2">
      <div ref={calendarWrapper} className="space-y-6">
        <h3 className="text-center text-xl font-bold">上映カーレンダー</h3>
        <div className="sticky top-0 z-50 px-4">
          <Select
            closeMenuOnSelect={false}
            components={{}}
            styles={{
              multiValueLabel: (base, { data }) => ({
                ...base,
                backgroundColor: setColor(data.value),
                color: '#fff',
                fontWeight: 'bold',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }),
              multiValueRemove: (base, { data }) => ({
                ...base,
                backgroundColor: setColor(data.value),
                color: '#fff',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                // borderLeft: '1px solid #fff',
                ':hover': {
                  opacity: 0.8,
                },
              }),
            }}
            isMulti
            defaultValue={screensOptions}
            options={screensOptions}
            onChange={(selectedScreens) => {
              const selectedScreenIds = selectedScreens.map(
                (screen) => screen.value
              )
              const selectedScreensData = initialScreens.current.filter(
                (screen) => selectedScreenIds.includes(screen.id)
              )
              setCurrentScreens(selectedScreensData)
            }}
          />
        </div>
        <div className="h-screen min-h-[600px] overflow-auto bg-white p-4">
          <DnDCalendar
            views={
              {
                month: true,
                week: true,
                day: true,
                outside: OutsideDisplayView,
              } as ViewsProps<Movie> & { outside: React.FC }
            }
            localizer={localizer}
            formats={formats}
            events={allEventsInScreens}
            draggableAccessor={() => true}
            onEventDrop={handleEventDrop}
            eventPropGetter={(event: Movie) => {
              return {
                className: clsx('cursor-grab'),
                style: {
                  boxSizing: 'border-box',
                  backgroundColor: !event.resource.isProduct
                    ? 'lightgray'
                    : event.resource.isActive
                    ? setColor(event.resource.screenId)
                    : '#fff',
                  color: !event.resource.isProduct
                    ? '#000'
                    : !event.resource.isActive &&
                      setColor(event.resource.screenId),
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: !event.resource.isProduct
                    ? setColor(event.resource.screenId)
                    : setColor(event.resource.screenId),
                },
              }
            }}
            messages={
              {
                today: '今日',
                previous: '←',
                next: '→',
                day: '日',
                month: '月',
                week: '週',
                outside: '外掲示用',
                showMore: (total) => `+${total} 見る`,
              } as Messages & {
                outside: string
              }
            }
            onSelectEvent={handleEventClick}
            onEventResize={handleEventResize}
            doShowMoreDrillDown={true}
            onSelectSlot={handleSelectSlot}
            selectable
            popup
            step={15}
            timeslots={4}
            // components={components}
          />
        </div>
      </div>

      {selectedEvent && (
        <Modal
          open={!!selectedEvent}
          title={
            <div>
              <div className="flex items-center gap-2 text-xl font-bold">
                {/* Status label */}
                <span
                  className={clsx(
                    'rounded-full px-2 py-1 text-xs font-bold text-white'
                  )}
                  style={{
                    backgroundColor: selectedEvent.resource.isActive
                      ? setColor(selectedEvent.resource.screenId)
                      : 'gray',
                  }}
                >
                  {selectedEvent.resource.isActive ? '販売中' : '非公開'}
                </span>
                {!selectedEvent.resource.isProduct && (
                  <span
                    className={clsx(
                      'rounded-full bg-gray-500 px-2 py-1 text-xs font-bold text-white'
                    )}
                  >
                    販売未設定
                  </span>
                )}
                {selectedEvent.end.getHours() >= 20 && <LateShowLabel />}
                <h2 className="flex items-center gap-2">
                  {initialScreens.current.find(
                    (screen) => screen.id === selectedEvent.resource.screenId
                  )?.name || 'スクリーン未設定'}{' '}
                  -
                  <span className="rounded bg-slate-800 px-2 py-1 text-center leading-none text-white">
                    {selectedEvent.resource.lens}
                  </span>
                  {selectedEvent.title || '作品未設定'}{' '}
                </h2>
              </div>
              <div
                className={clsx(
                  selectedEvent.resource.isProduct &&
                    !selectedEvent.resource.isActive
                    ? ''
                    : 'mt-4',
                  'flex items-center gap-4'
                )}
              >
                {!selectedEvent.resource.isProduct && (
                  <button
                    className="rounded bg-blue-500 p-10 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                    disabled={true}
                  >
                    商品として登録
                  </button>
                )}
                {/* Delete button */}
                {!selectedEvent.resource.isProduct &&
                  !selectedEvent.resource.isActive && (
                    <button
                      className="rounded bg-red-500 p-10 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                      onClick={deleteSelectedEvent}
                    >
                      削除
                    </button>
                  )}
                {/* Cancel Button */}
                {selectedEvent.resource.isProduct &&
                  selectedEvent.resource.isActive && (
                    <button
                      className="rounded bg-gray-500 p-10 px-4 py-2 text-sm font-bold text-white hover:bg-gray-700"
                      onClick={() => {
                        setSelectedEvent(undefined)
                      }}
                    >
                      販売キャンセル
                    </button>
                  )}
              </div>
            </div>
          }
          onClose={() => {
            setSelectedEvent(undefined)
          }}
          large
        >
          <Modal.Section>
            <div className="flex min-h-[66vh] flex-col justify-between">
              <Tabs
                tabs={tabs}
                selected={selectedTab}
                onSelect={handleTabChange}
              >
                <div ref={tabContentWrapper} className="h-[80%] p-4">
                  {tabs[selectedTab].id === 'seats' && (
                    <>
                      <Screen id={selectedEvent.resource.screenId} />
                    </>
                  )}
                  {tabs[selectedTab].id === 'schedule' && (
                    <ScheduleForm
                      currentScreens={currentScreens}
                      movies={initialData}
                      initialScreens={initialScreens}
                      selectedMovie={selectedEvent}
                      onSetCurrentEvent={(newSelectedEvent) => {
                        setSelectedEvent(newSelectedEvent)
                        toast.success('Schedule updated successfully', {
                          toastId: 'ScheduleSubmitted',
                        })
                      }}
                      onSetCurrentScreens={(newCurrentScreens) => {
                        setCurrentScreens(newCurrentScreens)
                        toast.success('Schedule updated successfully', {
                          toastId: 'ScheduleSubmitted',
                        })
                      }}
                    />
                  )}
                  {tabs[selectedTab].id === 'playlist' && (
                    <div>
                      <Playlist
                        onSubmit={(list) => {
                          console.log(list)
                        }}
                        // movieTitle={selectedEvent.title.toString()}
                        movie={selectedEvent}
                        startDate={selectedEvent.start}
                      />
                    </div>
                  )}
                  {tabs[selectedTab].id === 'types' && (
                    <TicketTypes
                      isLateShow={selectedEvent.end.getHours() >= 20}
                    />
                  )}
                </div>
              </Tabs>
            </div>
          </Modal.Section>
        </Modal>
      )}
    </div>
  )
}

const tabs = [
  {
    id: 'schedule',
    content: 'スケジュール',
    panelID: 'schedule',
  },
  {
    id: 'playlist',
    content: 'プレイリスト',
    panelID: 'Playlist',
  },
  {
    id: 'seats',
    content: '座席表',
    panelID: 'Seats',
  },
  {
    id: 'types',
    content: 'チケット種別',
    panelID: 'Types',
  },
]

const useDndCalendarEvents = (initialScreens: Screen[]) => {
  const [currentScreens, setCurrentScreens] = useState(initialScreens)

  const allEventsInScreens = useMemo(
    () =>
      currentScreens.reduce<Event>((acc, screen) => {
        return [...acc, ...screen.schedule]
      }, []),
    [currentScreens]
  )
  const [selectedEvent, setSelectedEvent] = useState<Movie>()

  const handleEventDrop = ({
    event,
    start,
    end,
  }: EventInteractionArgs<Movie>) => {
    const updatedScreenSchedule = currentScreens.map((screen) => {
      const updatedSchedule = screen.schedule.map((movie) => {
        if (
          movie.resource.id === event.resource.id &&
          movie.resource.screenId === event.resource.screenId
        ) {
          return {
            ...movie,
            start: new Date(start),
            end: new Date(end),
          }
        }
        return movie
      })
      return {
        ...screen,
        schedule: updatedSchedule,
      }
    })
    setCurrentScreens(updatedScreenSchedule)
  }

  const handleEventClick = useCallback((calEvent: Event & Movie) => {
    setSelectedEvent({
      ...calEvent,
    })
  }, [])

  const handleEventResize = useCallback(
    ({ event, start, end }: EventInteractionArgs<Movie>) => {
      setCurrentScreens((cur) =>
        cur.map((screen) => {
          const updatedSchedule = screen.schedule.map((movie) => {
            if (
              movie.resource.id === event.resource.id &&
              movie.resource.screenId === event.resource.screenId
            ) {
              return {
                ...movie,
                start: new Date(start),
                end: new Date(end),
              }
            }
            return movie
          })
          return {
            ...screen,
            schedule: updatedSchedule,
          }
        })
      )
    },
    []
  )

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    const confirmed = window.confirm('イベントを作成しますか?')

    if (!confirmed) return

    const newShow = {
      title: '未設定',
      start: slotInfo.start,
      end: slotInfo.end,
      resource: {
        id: -customAlphabet('0123456789', 5)(),
        screenId: -1,
        isActive: false,
        isProduct: false,
        lens: '',
      },
    }

    setCurrentScreens((cur) => {
      const updatedScreen = cur.map((screen) => {
        if (screen.id === -1) {
          return {
            ...screen,
            schedule: [...screen.schedule, newShow],
          }
        }
        return screen
      })
      return updatedScreen
    })

    setSelectedEvent(newShow)
  }, [])

  const deleteSelectedEvent = useCallback(() => {
    setCurrentScreens((cur) => {
      const updatedScreen = cur.map((screen) => {
        const updatedSchedule = screen.schedule.filter(
          (movie) => movie.resource.id !== selectedEvent?.resource.id
        )
        return {
          ...screen,
          schedule: updatedSchedule,
        }
      })
      return updatedScreen
    })

    setSelectedEvent(undefined)

    toast.success('削除しました')
  }, [selectedEvent])

  return {
    handleEventDrop,
    handleEventClick,
    handleEventResize,
    allEventsInScreens,
    selectedEvent,
    setSelectedEvent,
    currentScreens,
    setCurrentScreens,
    handleSelectSlot,
    deleteSelectedEvent,
  }
}
