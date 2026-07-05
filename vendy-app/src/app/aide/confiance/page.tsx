import { PhoneShell, PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";

export default function TrustHelpPage() {
  return (
    <PhoneShell>
      <MobileTopBar backHref="/profile" title="Protection Vendy" />
      <PageContainer className="space-y-5 prose prose-sm max-w-none">
        <h2 className="text-lg font-semibold text-vendy-text">Comment Vendy protège vos achats</h2>
        <div className="space-y-4 text-sm text-vendy-secondary leading-relaxed">
          <section>
            <h3 className="font-medium text-vendy-text mb-1">Paiement sécurisé</h3>
            <p>
              Votre paiement est conservé par Vendy jusqu&apos;à ce que vous validiez la
              réception de votre commande.
            </p>
          </section>
          <section>
            <h3 className="font-medium text-vendy-text mb-1">Validation acheteur</h3>
            <p>
              Le vendeur n&apos;est payé qu&apos;après votre validation. Vous avez le temps
              de vérifier que tout correspond à votre commande.
            </p>
          </section>
          <section>
            <h3 className="font-medium text-vendy-text mb-1">Envoi suivi</h3>
            <p>
              Chaque commande dispose d&apos;un suivi. Vous savez où en est votre colis à
              chaque étape.
            </p>
          </section>
          <section>
            <h3 className="font-medium text-vendy-text mb-1">Support en cas de problème</h3>
            <p>
              Si quelque chose ne va pas, vous pouvez signaler un problème depuis votre
              commande. L&apos;équipe Vendy vous accompagne.
            </p>
          </section>
        </div>
      </PageContainer>
    </PhoneShell>
  );
}
