import { Container } from "@/components/container";
import { Typography } from "@/components/typography";

export default function Page() {
  return (
    <Container className="flex flex-col gap-4 my-10">
      <section>
        <Typography variant="h2" className="mb-10">
          Présentation du site internet
        </Typography>
        <p>
          Le site internet <strong>www.drivite.fr</strong> est la propriété
          exclusive de la société par actions simplifiée Drivite SAS, au capital
          de 4 000 euros, inscrite au RCS de Lyon B 938 048 881, SIRET 938 048
          881 000 16, dont le siège social est au{" "}
          <strong>12 Rue de la Part-Dieu – 69003 Lyon</strong>.
        </p>
        <p>
          Le responsable de la publication est la Présidente Sarah Hanine,
          joignable à l’adresse électronique suivante :
          <a href="mailto:contact@drivite.fr">contact@drivite.fr</a>.
        </p>
        <p>
          L&apos;hébergeur de ce site est <strong>OVH SAS</strong>, au capital
          de 50 000 000 euros, situé 2 rue Kellermann, 59100 Roubaix,
          immatriculé au RCS Lille Métropole B 424 761 419, SIRET 537 407 926
          sise 2, accessible à l&apos;adresse{" "}
          <a href="https://www.ovh.fr" target="_blank">
            www.ovh.fr
          </a>
          .
        </p>
        <p>
          L&apos;éditeur de ce site est <strong>Otopio</strong>, agence web
          spécialisée dans la création de sites et d&apos;applications sur
          mesure, joignable à l&apos;adresse électronique suivante :
          <a href="mailto:contact@otopio.net">contact@otopio.net</a>, accessible
          à l’adresse{" "}
          <a href="https://www.otopio.net" target="_blank">
            www.otopio.net
          </a>
          .
        </p>
      </section>
      <section>
        <h2>Conditions générales d’utilisation du site</h2>
        <p>
          L’utilisation du site <strong>www.drivite.fr</strong> implique
          l’acceptation pleine et entière des conditions générales d’utilisation
          ci-après décrites. Ces conditions d’utilisation sont susceptibles
          d’être modifiées ou complétées à tout moment, les utilisateurs sont
          donc invités à les consulter régulièrement.
        </p>
        <p>
          Le site a pour but de fournir des informations sur l’ensemble des
          activités de l&apos;entreprise. Nous nous efforçons de proposer des
          informations aussi précises que possible. Cependant, nous ne pouvons
          être tenus responsables des omissions, inexactitudes ou lacunes dans
          la mise à jour, qu&apos;elles soient de notre fait ou dues à des
          tiers.
        </p>
      </section>
      <section>
        <h2>Propriété intellectuelle et contrefaçons</h2>
        <p>
          Le site <strong>www.drivite.fr</strong> est titulaire des droits de
          propriété intellectuelle et détient les droits d’usage sur l’ensemble
          des éléments présents sur le site, y compris les textes, images,
          graphismes, logos, vidéos, icônes et sons.
        </p>
        <p>
          Toute reproduction ou exploitation non autorisée du site ou de ses
          éléments sera considérée comme une contrefaçon et poursuivie
          conformément aux dispositions légales.
        </p>
      </section>
      <section>
        <h2>Limitations de responsabilité</h2>
        <p>
          La responsabilité de l&apos;éditeur ne saurait être engagée en cas de
          défaillance, de panne ou d&apos;interruption du service.
          L&apos;utilisateur est responsable de son matériel et de sa sécurité.
        </p>
        <p>
          En cas de litige, le droit français est applicable, avec attribution
          exclusive aux tribunaux compétents.
        </p>
      </section>
      <section>
        <h2>Gestion des données personnelles</h2>
        <p>
          Conformément à la loi « Informatique et Libertés » et au RGPD, les
          utilisateurs disposent de droits concernant leurs données personnelles
          : accès, rectification, effacement, opposition, etc. Pour exercer ces
          droits, veuillez envoyer une demande à :{" "}
          <a href="mailto:contact@drivite.fr">contact@drivite.fr</a>.
        </p>
      </section>
      <section>
        <h2>Mise à jour et gestion du site</h2>
        <p>
          La société se réserve le droit de mettre à jour le site à tout moment.
          Les utilisateurs sont invités à consulter régulièrement cette page.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question ou information, contactez-nous à l’adresse
          suivante :<a href="mailto:contact@drivite.fr">contact@drivite.fr</a>.
        </p>
      </section>
    </Container>
  );
}
