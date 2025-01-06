<template>
    <section class="hero-banner">
        <div class="mentions-container">
            <section class="mentions-section-container">
                <section class="sectionmentions1">
                    <div class="titresectionmention">Responsables</div>
                    <br>
                    <div class="textmention">Thomas Grandjean</div>
                    <div class="textmention">MAIL NUMBER</div>
                    <br>
                    <div class="textmention">Yannick Gras</div>
                    <div class="textmention">pro@ygras.fr NUMBER</div>
                    <br>
                    <div class="textmention">Mathis Fossard</div>
                    <div class="textmention">mathisfossard22@gmail.com 0766393865</div>
                </section>
                <section class="sectionmentions2">
                    <div class="titresectionmention">Mentions légales</div>
                    <br>
                    <div class="textmention">Le présent site « bon appetit » est édité au GRETA CFA de Lannion</div>
                    <br>
                    <div class="textmention">Le traitement de vos données à caractère personnel est régi par la Charte du respect de la vie privée, conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).</div>
                    <br>
                    <div class="textmention">Bon appetit by Yannick Gras Thomas Grandjean and Mathis Fossard is licensed under CC BY-NC 4.0 </div>
                </section>
                <section class="sectionmentions3">
                    <div class="titresectionmention">Sources</div>
                    <br>
                    <div class="textmention">Toutes les images utilisées sont libres de droits</div>
                    <br>
                    <div class="textmention">stock.adobe.com</div>
                    <div class="textmention">freepik.com</div>
                    <div class="textmention">Icones faites par Pixel perfect de www.flaticon.com</div>
                </section>
            </section>
        </div>
    </section>
</template>

<script>
</script>

<style scoped>
.hero-banner {
    background-color: #f8f9fa;
    padding: 2em 0;
}

.mentions-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1em;
}

.mentions-section-container {
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.sectionmentions1, .sectionmentions2, .sectionmentions3 {
    background-color: #ffffff;
    padding: 1em;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.titresectionmention {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0.5em;
    color: #333;
}

.textmention {
    font-size: 1em;
    color: #555;
    line-height: 1.5;
}

@media (min-width: 768px) {
    .mentions-section-container {
        flex-direction: row;
        justify-content: space-between;
    }

    .sectionmentions1, .sectionmentions2, .sectionmentions3 {
        flex: 1;
        margin: 0 1em;
    }
}
</style>