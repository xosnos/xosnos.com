import { BriefcaseBusiness, CalendarRange, MapPin } from 'lucide-react';
import { listPublishedExperiences } from '@/data/experience';

const Experience = async () => {
  const items = listPublishedExperiences();

  const formatMonthYear = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : '';

  return (
    <section id="experience" className="bg-primary py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold uppercase flex items-center justify-center gap-4 mb-6 text-secondary">
            <BriefcaseBusiness className="w-8 h-8" />
            <span>Experience</span>
            <BriefcaseBusiness className="w-8 h-8" />
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-secondary"></div>
            <div className="mx-4">
              <div className="w-4 h-4 bg-secondary"></div>
            </div>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center bg-white rounded-lg shadow-sm p-10 border border-gray-200">
            <p className="text-gray-800 text-lg font-semibold">No experiences added yet.</p>
            <p className="text-gray-700 mt-3">
              Add entries in <code className="bg-primary px-2 py-1 rounded-sm border border-gray-200">src/data/experience.ts</code>{' '}
              to populate this section.
            </p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-gray-500">{item.organization}</p>
                    <h3 className="text-2xl font-montserrat font-bold text-gray-900">{item.role}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarRange className="w-4 h-4" />
                    <span>
                      {formatMonthYear(item.startDate)} – {item.endDate ? formatMonthYear(item.endDate) : 'Present'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location || 'Remote / Hybrid'}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="capitalize">{item.type}</span>
                  {item.link && (
                    <>
                      <span className="mx-2 text-gray-300">•</span>
                      <a
                        href={item.link}
                        className="text-primary font-semibold hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </>
                  )}
                </div>

                {item.description && <p className="text-gray-700 leading-relaxed">{item.description}</p>}

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;

