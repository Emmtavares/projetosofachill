$(function() {
    $("#chat-container").load("chat.html", function() {
        document.getElementById('chat-open').addEventListener('click', function() {
            document.querySelector('.chat-box').style.display = 'flex';
            this.style.display = 'none';
        });

        document.getElementById('chat-close').addEventListener('click', function() {
            document.querySelector('.chat-box').style.display = 'none';
            document.getElementById('chat-open').style.display = 'block';
        });

        document.getElementById('chat-send').addEventListener('click', function() {
            sendMessage();
        });

        document.getElementById('chat-input-field').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const inputField = document.getElementById('chat-input-field');
            const message = inputField.value.trim();
            if (message) {
                addMessage('user', message);
                inputField.value = '';
                getBotResponse(message);
            }
        }

        function addMessage(sender, message) {
            const chatMessages = document.getElementById('chat-messages');
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message ' + sender;
            messageElement.innerText = message;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeAccents(str) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        function getSimilarityScore(userMessage, predefinedMessage) {
            const userWords = removeAccents(userMessage.toLowerCase()).split(' ').filter(word => word.length >= 3);
            const predefinedWords = removeAccents(predefinedMessage.toLowerCase()).split(' ').filter(word => word.length >= 3);

            let commonWordsCount = 0;
            userWords.forEach(userWord => {
                if (predefinedWords.includes(userWord)) {
                    commonWordsCount++;
                }
            });

            return commonWordsCount / Math.max(userWords.length, predefinedWords.length);
        }

        const products = [
            {
                name: "Capa de Sofá de Canto",
                price: "80,00€",
                features: ["Alta Qualidade", "Fácil de Instalar", "Proteção Completa", "Lavável"],
                dimensions: {
                    arms: [60, 100],
                    seat_back: [340, 540],
                    height: [80, 100]
                }
            },
            {
                name: "Capa de Sofá Tradicional",
                price: "50,00€",
                features: ["Material Premium", "Fácil de Instalar", "Proteção Completa", "Lavável"],
                dimensions: {
                    arms: [15, 30],
                    seat_back: [130, 230],
                    height: [80, 110],
                    width: [60, 110],
                    arm_height: [40, 65]
                }
            },
            {
                name: "Capa de Sofá Relax",
                price: "30,00€",
                features: ["Material Premium", "Fácil de Instalar", "Proteção Completa", "Lavável"],
                dimensions: {
                    back: [60, 85],
                    height: [80, 100],
                    width: [60, 80],
                    seat_back_length: [160, 180],
                    arm_height: [50, 65]
                }
            }
        ];

        function extractMeasurements(input) {
            const measurements = {};
            const regex = /(\d+)\s?cm/gi;
            let match;
            while ((match = regex.exec(input)) !== null) {
                measurements[regex.lastIndex] = parseInt(match[1]);
            }
            return measurements;
        }

        function recommendProduct(measurements) {
            for (const product of products) {
                const dims = product.dimensions;
                if (
                    (dims.seat_back && measurements.some(m => m >= dims.seat_back[0] && m <= dims.seat_back[1])) ||
                    (dims.back && measurements.some(m => m >= dims.back[0] && m <= dims.back[1]))
                ) {
                    return `Para o seu sofá, recomendo a ${product.name} que custa ${product.price}. Características: ${product.features.join(', ')}.`;
                }
            }
            return "Desculpe, não encontrei uma capa adequada para as suas medidas.";
        }

        function getBotResponse(userMessage) {
            const measurements = extractMeasurements(userMessage);
            if (Object.keys(measurements).length > 0) {
                const response = recommendProduct(Object.values(measurements));
                setTimeout(() => {
                    addMessage('bot', response);
                }, 500);
                return;
            }

            const responses = {
                "Olá": "Olá! Como posso ajudar hoje?",
                "como está?": "Estou bem, obrigado por perguntar! E consigo?",
                "qual é o teu nome?": "Eu sou o Zé, o assistente virtual do SofáChill",
                "o que é que tu fazes?": "Eu estou aqui para ajudar com informações sobre nossos serviços.",
                "como faço uma encomenda?": "Pode realizar uma encomenda através da página dos nossos produtos, adicionando-os ao seu carrinho e preenchendo o formulário no checkout.",
                "obrigado": "De nada! Se precisar de mais alguma coisa, estou à sua disposição.",
                "tchau": "Tchau! Tenha um ótimo dia!",
                "qual é a morada do SofáChill?": "Estamos localizados na Rua Exemplo, 123, Cidade, País.",
                "qual é o telefone do SofáChill?": "Você pode nos ligar pelo número +351 123 456 789.",
                "quais são os horários de atendimento?": "Atendemos de segunda a sexta, das 8h às 18h.",
                "quais os métodos de pagamento disponíveis?": "Temos disponíveis pagamentos por: Transferência Bancária, Paypal, Mbway",
                "o meu sofá tem 4m de comprimento e 90cm de largura, e é um sofá em forma de L, qual capa recomendas?": "Para esse tipo de sofá recomendo a nossa capa de Sofá de Canto"
            };

            let bestResponse = "Desculpe, não entendi a sua pergunta. Pode reformular?";
            let highestScore = 0;

            Object.keys(responses).forEach(key => {
                const score = getSimilarityScore(userMessage, key);
                if (score > highestScore) {
                    highestScore = score;
                    bestResponse = responses[key];
                }
            });

            setTimeout(() => {
                addMessage('bot', bestResponse);
            }, 500);
        }
    });
});
