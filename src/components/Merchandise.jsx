import { useLanguage } from '../context/LanguageContext';

export default function Merchandise() {
    const { t } = useLanguage();

    return (
        <main className="max-w-4xl mx-auto py-20 px-6">
            <h1 className="text-3xl font-bold mb-4">{t('membership.merchandise') || 'Merchandise'}</h1>
            <p className="text-base text-charcoal/80">{t('membership.merchandiseDesc') || 'Official C3A branded merch.'}</p>
            <section className="mt-8">
                <p className="text-sm text-charcoal/70">{t('membership.dropsAnnouncedSoon') || ''}</p>
            </section>
        </main>
    );
}
