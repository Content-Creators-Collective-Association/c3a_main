import { useLanguage } from '../context/LanguageContext';

export default function CreatorsLab() {
    const { t } = useLanguage();

    return (
        <main className="max-w-4xl mx-auto py-20 px-6">
            <h1 className="text-3xl font-bold mb-4">{t('creatorsLab.title') || 'Creators Lab'}</h1>
            <p className="text-base text-charcoal/80">{t('creatorsLab.description') || 'Resources for creators.'}</p>
            <section className="mt-8">
                <p className="text-sm text-charcoal/70">{t('creatorsLab.intro') || ''}</p>
            </section>
        </main>
    );
}
