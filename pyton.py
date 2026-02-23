import pygame
import math
import random

# Constants
WIDTH, HEIGHT = 1200, 700
FPS = 60

# Colors
BG = (20, 25, 30)
BLUE = (0, 180, 255)
RED = (255, 50, 50)
GOLD = (255, 215, 0)
WHITE = (255, 255, 255)

class Stickman:
    def __init__(self, x, y, color, side):
        self.x = x
        self.y = y
        self.color = color
        self.side = side # 1 for right-facing, -1 for left-facing
        self.pose = "idle"
        self.frame = 0
        self.target_x = x
        self.velocity = 0
        self.health = 100

    def draw(self, screen):
        # Head
        pygame.draw.circle(screen, self.color, (int(self.x), self.y - 120), 25)
        # Body
        pygame.draw.line(screen, self.color, (self.x, self.y - 95), (self.x, self.y - 20), 10)
        
        # Legs and Arms
        if self.pose == "idle":
            # Breathing effect
            offset = math.sin(self.frame * 0.1) * 5
            pygame.draw.line(screen, self.color, (self.x, self.y - 20), (self.x - 25, self.y + 40), 10) # Leg L
            pygame.draw.line(screen, self.color, (self.x, self.y - 20), (self.x + 25, self.y + 40), 10) # Leg R
            pygame.draw.line(screen, self.color, (self.x, self.y - 70), (self.x - 35, self.y - 40 + offset), 8) # Arm L
            pygame.draw.line(screen, self.color, (self.x, self.y - 70), (self.x + 35, self.y - 40 + offset), 8) # Arm R
        
        elif self.pose == "punch":
            pygame.draw.line(screen, self.color, (self.x, self.y - 20), (self.x - 10, self.y + 40), 10)
            pygame.draw.line(screen, self.color, (self.x, self.y - 20), (self.x + 40 * self.side, self.y + 40), 10)
            # Rear arm
            pygame.draw.line(screen, self.color, (self.x, self.y - 70), (self.x - 30 * self.side, self.y - 50), 8)
            # PUNCH ARM
            pygame.draw.line(screen, self.color, (self.x, self.y - 70), (self.x + 90 * self.side, self.y - 70), 12)

        elif self.pose == "hit":
            pygame.draw.line(screen, self.color, (self.x, self.y - 20), (self.x - 40 * self.side, self.y + 30), 10)
            pygame.draw.line(screen, self.color, (self.x, self.y - 20), (self.x - 10 * self.side, self.y + 40), 10)
            pygame.draw.line(screen, self.color, (self.x, self.y - 70), (self.x - 50 * self.side, self.y - 100), 8)
            pygame.draw.line(screen, self.color, (self.x, self.y - 70), (self.x - 40 * self.side, self.y - 110), 8)

    def update(self):
        self.frame += 1
        # Interpolate movement
        self.x += (self.target_x - self.x) * 0.1

def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Stickman Fight - LIVE ACTION")
    clock = pygame.time.Clock()
    
    p1 = Stickman(200, 500, BLUE, 1)
    p2 = Stickman(1000, 500, RED, -1)
    
    running = True
    timer = 0
    hit_spark = None
    ko = False
    
    while running:
        screen.fill(BG)
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        
        timer += 1
        
        # Scripted Combat Sequence
        if timer < 60: # Staredown
            p1.target_x = 400
            p2.target_x = 800
        elif timer < 120: # Blue approach
            p1.target_x = 550
        elif timer == 140: # Blue Punch!
            p1.pose = "punch"
            p2.pose = "hit"
            hit_spark = (650, 430)
        elif timer == 160: # Reset
            p1.pose = "idle"
            p2.pose = "idle"
            hit_spark = None
            p2.target_x = 850
        elif timer == 200: # Red counter
            p2.target_x = 650
            p2.pose = "punch"
            p1.pose = "hit"
            hit_spark = (550, 430)
        elif timer == 220:
            p1.pose = "idle"
            p2.pose = "idle"
            hit_spark = None
        elif 300 < timer < 450: # FLURRY
            if timer % 10 == 0:
                p1.pose = random.choice(["punch", "idle"])
                p2.pose = "hit" if p1.pose == "punch" else "idle"
                if p1.pose == "punch": hit_spark = (p1.x + 80, 430)
            if timer % 15 == 0:
                p2.pose = random.choice(["punch", "idle"])
                p1.pose = "hit" if p2.pose == "punch" else "idle"
                if p2.pose == "punch": hit_spark = (p2.x - 80, 430)
        elif timer == 480: # FINAL BLOW
            p1.pose = "punch"
            p2.pose = "hit"
            p2.target_x = 1500 # FLYING AWAY
            hit_spark = (p1.x + 80, 430)
            ko = True
        
        # Draw ground
        pygame.draw.line(screen, (100, 100, 100), (0, 545), (WIDTH, 545), 5)
        
        # Update and Draw players
        p1.update()
        p2.update()
        p1.draw(screen)
        p2.draw(screen)
        
        # Effects
        if hit_spark:
            pygame.draw.circle(screen, GOLD, hit_spark, random.randint(30, 60))
            
        if ko:
            font = pygame.font.SysFont("Arial", 150, bold=True)
            txt = font.render("K.O.", True, RED)
            screen.blit(txt, (WIDTH//2 - 150, HEIGHT//2 - 100))

        pygame.display.flip()
        clock.tick(FPS)
        
        if timer > 600: # End loop
            running = False

    pygame.quit()

if __name__ == "__main__":
    main()