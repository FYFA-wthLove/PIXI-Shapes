        
        let app;
        let shapesSpeed = 3;
        let shapesNumberContainer;
        let surfaceAreaContainer;
        let totalShapes = 14;
        let timer = 10;
        let targetClick = true;

        app = new PIXI.Application(
            {
                width: 1800,
                height: 800,
                backgroundColor: 0xAAAAAA,
                antialiasing: true,
                transparent: false,
                resolution: 1

            }
            
        );
        document.body.appendChild(app.view);


        // Create container for number of shapes

        let totalContainer = new PIXI.Container();
        app.stage.addChild(totalContainer);

        shapesNumberContainer = new PIXI.Container();
        totalContainer.addChild(shapesNumberContainer);

        let shapesNumberRectangle = new PIXI.Graphics();
        shapesNumberRectangle.beginFill(0xFF0000);
        shapesNumberRectangle.drawRect(app.view.width / 2 - 75, 0, 150, 40);
        shapesNumberContainer.addChild(shapesNumberRectangle);

        let textOfShapesNumber = new PIXI.Text(totalShapes);
        textOfShapesNumber.anchor.set(0.5);
        textOfShapesNumber.x = app.view.width / 2;
        textOfShapesNumber.y = shapesNumberRectangle.height / 2;
        textOfShapesNumber.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 25,
            fontFamily: "Arial",
            fontStyle: "bold",
            stroke: 0xFFFFFF,
            strokeThickness: 4
        });
        shapesNumberContainer.addChild(textOfShapesNumber);

        let state = play;
        app.ticker.add(delta => gameLoop(delta));



        let decreaseNumberOfShapes = new PIXI.Graphics();
        let increaseNumberOfShapes = new PIXI.Graphics();
        decreaseNumberOfShapes.beginFill(0xAAAAAA);
        increaseNumberOfShapes.beginFill(0xAAAAAA);
        decreaseNumberOfShapes.drawRect(0, 760, 50, 40);
        increaseNumberOfShapes.drawRect(50, 760, 50, 40);
        // decreaseNumberOfShapes.interactive = true;
        // decreaseNumberOfShapes.buttonMode = true;
        // decreaseNumberOfShapes.on("pointerdown", decreaseClick);

        increaseNumberOfShapes.interactive = true;
        increaseNumberOfShapes.buttonMode = true;
        shapesNumberContainer.addChild(decreaseNumberOfShapes);
        shapesNumberContainer.addChild(increaseNumberOfShapes);
        let textDecrease = new PIXI.Text("-");
        let textIncrease = new PIXI.Text("+");
        textDecrease.anchor.set(0.5);
        textIncrease.anchor.set(0.5);
        textDecrease.x = 25;
        textDecrease.y = 780;
        textIncrease.x = 75;
        textIncrease.y = 780;
        textDecrease.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 40,
            fontFamily: "Arial",
            fontStyle: "bold",
            stroke: 0xFFFFFF,
            strokeThickness: 3
        });
        textIncrease.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 40,
            fontFamily: "Arial",
            fontStyle: "bold",
            stroke: 0xFFFFFF,
            strokeThickness: 3
        });
        shapesNumberContainer.addChild(textDecrease);
        shapesNumberContainer.addChild(textIncrease);


        // speed buttons
        let decreaseSpeedOfShapes = new PIXI.Graphics();
        let increaseSpeedOfShapes = new PIXI.Graphics();
        decreaseSpeedOfShapes.beginFill(0xAAAAAA);
        increaseSpeedOfShapes.beginFill(0xAAAAAA);
        decreaseSpeedOfShapes.drawRect(100, 760, 50, 40);
        increaseSpeedOfShapes.drawRect(150, 760, 50, 40);
        decreaseSpeedOfShapes.interactive = true;
        decreaseSpeedOfShapes.buttonMode = true;
        increaseSpeedOfShapes.interactive = true;
        increaseSpeedOfShapes.buttonMode = true;
        shapesNumberContainer.addChild(decreaseSpeedOfShapes);
        shapesNumberContainer.addChild(increaseSpeedOfShapes);


        let textDecreaseSpeed = new PIXI.Text("-");
        let textIncreaseSpeed = new PIXI.Text("+");
        textDecreaseSpeed.anchor.set(0.5);
        textIncreaseSpeed.anchor.set(0.5);
        textDecreaseSpeed.x = 125;
        textDecreaseSpeed.y = 780;
        textIncreaseSpeed.x = 175;
        textIncreaseSpeed.y = 780;
        textDecreaseSpeed.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 40,
            fontFamily: "Arial",
            fontStyle: "bold",
            stroke: 0xFFFFFF,
            strokeThickness: 3
        });
        textIncreaseSpeed.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 40,
            fontFamily: "Arial",
            fontStyle: "bold",
            stroke: 0xFFFFFF,
            strokeThickness: 3
        });
        shapesNumberContainer.addChild(textDecreaseSpeed);
        shapesNumberContainer.addChild(textIncreaseSpeed);



        const shapes = [];
        const shapesFrame = [
            "images/rectangle.png",
            "images/pexagon.png",
            "images/pentagon.png",
            "images/triangle.png",
            "images/circle.png",
            "images/ellipse.png",
            "images/star.png"
        ];

        for (let i = 0; i < totalShapes; i++){
            const frameName = shapesFrame[i % shapesFrame.length];
        
            let rectangle = PIXI.Sprite.from(frameName);
            
        
            rectangle.anchor.set(0.5);
            rectangle.scale.set(0.8 + Math.random() * 0.3);   // размер
            rectangle.x = Math.random() * app.screen.width;
            //rectangle.y = Math.random() * app.screen.height;

            rectangle.tint = Math.random() * 0xFFFFFF;
        
            //rectangle.direction = Math.random() * Math.PI * 2;
            rectangle.direction = rectangle.y;
        
            //rectangle.turningSpeed = Math.random() - 0.8;
            rectangle.turningSpeed = rectangle.y;
        
            rectangle.speed = shapesSpeed + Math.random() * 2;
            //rectangle.speed = shapesSpeed;


            //app.stage.interactive = true;
            //app.stage.addChild(rectangle);

            totalContainer.addChild(rectangle);
            shapes.push(rectangle);
        

            rectangle.interactive = true;
            rectangle.buttonMode = true;
            rectangle.on("pointerdown", () => {
                if (targetClick){
                    totalShapes--;
                    rectangle.scale.x = null;
                    rectangle.scale.y = null;
                    textOfShapesNumber.text = totalShapes;
                    targetClick = false;
                    timer = 10;
                }
                console.log("Click")
            });
        

            decreaseNumberOfShapes.interactive = true;
            decreaseNumberOfShapes.buttonMode = true;
            decreaseNumberOfShapes.on("pointerdown", () => {
                if (targetClick){
                    totalShapes--;
                    rectangle.scale.x = null;
                    rectangle.scale.y = null;
                    textOfShapesNumber.text = totalShapes;
                    targetClick = false;
                    timer = 10;
               } 
            });

            decreaseSpeedOfShapes.on("pointerdown", () => {
                if (targetClick){
                    shapesSpeed--;
                    rectangle.speed = shapesSpeed;
                    targetClick = false;
                    timer = 10;
                }
            });
        }


            

        



        
        const rectangleBoundsPadding = 50;   // периодичность
        const rectangleBounds = new PIXI.Rectangle(-rectangleBoundsPadding, -rectangleBoundsPadding,
            app.screen.width + rectangleBoundsPadding * 2,
            app.screen.height + rectangleBoundsPadding * 2);
        

        app.ticker.add(() => {
            for (let i = 0; i < shapes.length; i++){
                const rectangle = shapes[i];

                rectangle.direction += rectangle.turningSpeed * 0.01;
                rectangle.x += Math.sin(rectangle.direction) * rectangle.speed;
                rectangle.y += Math.cos(rectangle.direction) * rectangle.speed;
                rectangle.rotation = -rectangle.direction - Math.PI / 2;

                if (rectangle.x < rectangleBounds.x){
                    rectangle.x += rectangleBounds.width;
                } else if (rectangle.x > rectangleBounds.x + rectangleBounds.width){
                    rectangle.x -= rectangleBounds.width;
                }

                if (rectangle.y < rectangleBounds.y){
                    rectangle.y += rectangleBounds.height;
                } else if (rectangle.y > rectangleBounds.y + rectangleBounds.height){
                    rectangle.y -= rectangleBounds.height;
                }     
            }
        });

        


        function gameLoop(delta){
            state(delta);
        }

        function play(){
            if (timer == 0){
                targetClick = true;
            } else if (timer > 0){
                timer--;
            }
        }
    

