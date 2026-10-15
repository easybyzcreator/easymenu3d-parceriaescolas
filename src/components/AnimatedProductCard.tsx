import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Product, Category, Settings, CartItem } from '../types';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface AnimatedProductCardProps {
  product: Product;
  category: Category;
  settings: Settings;
  cart: CartItem[];
  currencySymbol: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onRemoveFromCart: (cartItemId: string) => void;
  getContrastText: (hexColor?: string) => string;
}

export const AnimatedProductCard: React.FC<AnimatedProductCardProps> = ({
  product,
  category,
  settings,
  cart,
  currencySymbol,
  onSelectProduct,
  onAddToCart,
  onRemoveFromCart,
  getContrastText,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Check if image is a transparent cutout (PNG, WebP or marked transparent/3D)
  const isTransparentImage = !!(
    product.isTransparent ||
    product.is3D ||
    product.title?.toLowerCase().includes('3d') ||
    product.image?.includes('cake_truffle_plate') ||
    product.image?.startsWith('data:image/png') ||
    product.image?.includes('.png') ||
    product.image?.includes('.webp')
  );

  // Smooth scroll tracking relative to viewport for dynamic emergence
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Responsive spring physics for fluid movement on mobile and desktop
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 24,
    mass: 0.4,
  });

  const scrollYOffset = useTransform(smoothProgress, [0.1, 0.45, 0.75, 0.98], [8, -18, -14, 4]);
  const imageScale = useTransform(smoothProgress, [0.1, 0.45, 0.75, 0.98], [0.96, 1.07, 1.05, 0.97]);
  const imageRotate = useTransform(smoothProgress, [0.15, 0.5, 0.85], [-1.4, 0, 1.4]);

  const totalQty = cart
    .filter((item) => item.productId === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  const hasSizes = !!(product.sizes && product.sizes.length > 0);
  const requiresCustomization = !!(
    hasSizes ||
    product.isCustomCake ||
    product.isMeal ||
    product.isCustomSandwich
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPointerPos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      whileTap={{ scale: 0.98 }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setPointerPos({ x: 0, y: 0 });
      }}
      onPointerMove={handlePointerMove}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('.cart-button-area')) {
          return;
        }
        onSelectProduct(product);
      }}
      className="bg-[#FAF7F2]/95 backdrop-blur-md rounded-[28px] p-3.5 sm:p-4 border border-[#EADBCC]/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_48px_rgba(0,0,0,0.14)] transition-all duration-300 flex flex-col justify-between cursor-pointer w-full group relative overflow-visible"
      style={{ perspective: 1200 }}
    >
      {/* Área de Exibição do Prato */}
      <div className="relative w-full aspect-[4/3] rounded-[22px] mb-3 flex items-center justify-center overflow-visible">
        {isTransparentImage ? (
          /* Prato Recortado Flutuante com Sombra de Contato Realista e Perspectiva 3D */
          <div
            className="relative w-full h-full flex items-center justify-center overflow-visible"
            style={{ perspective: 1000 }}
          >
            {/* Prato Flutuando com Inclinação e Elevação 3D Realista */}
            <motion.div
              style={{
                y: scrollYOffset,
                scale: imageScale,
                rotateZ: imageRotate,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: isHovered ? pointerPos.x * 28 : 0,
                rotateX: isHovered ? -pointerPos.y * 28 : 6,
                y: isHovered ? -26 : -8,
                scale: isHovered ? 1.12 : 1.02,
                translateZ: isHovered ? 50 : 20,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 22,
              }}
              className="relative w-full h-full flex items-center justify-center z-10 select-none overflow-visible"
            >
              {/* Flutuação Contínua e Orgânica ("Tomar Vida") */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotateZ: [0, 0.8, -0.8, 0],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full max-h-[190px] object-contain select-none transition-transform duration-500 drop-shadow-[0_10px_14px_rgba(0,0,0,0.18)] group-hover:drop-shadow-[0_16px_20px_rgba(0,0,0,0.26)]"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          </div>
        ) : (
          /* Card com moldura para fotos fechadas convencionais */
          <div className="relative w-full h-full rounded-[20px] bg-stone-100/60 p-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04)] ring-1 ring-black/5 flex items-center justify-center overflow-hidden">
            <motion.div
              style={{
                y: scrollYOffset,
                scale: imageScale,
                rotateZ: imageRotate,
              }}
              className="relative w-full h-full rounded-[18px] overflow-hidden z-10"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          </div>
        )}

        {/* Badge de Categoria Flutuante com Glassmorphism */}
        <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-sm text-gray-900 shadow-sm border border-black/5">
            {category.title}
          </span>
        </div>
      </div>

      {/* Informações Textuais */}
      <div className="flex flex-col flex-grow px-0.5">
        <h3
          className="text-base sm:text-lg font-serif font-black leading-snug tracking-tight mb-1 group-hover:translate-x-0.5 transition-transform"
          style={{ color: settings.productTitleColor || '#1A202C' }}
        >
          {product.title}
        </h3>
        {product.description && (
          <p
            className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3"
            style={{ color: settings.productDescColor || 'rgba(55, 65, 81, 0.9)' }}
          >
            {product.description}
          </p>
        )}
      </div>

      {/* Rodapé com Preço e Botão de Ação */}
      <div className="pt-3 border-t border-black/5 flex items-center justify-between mt-auto px-0.5">
        <div>
          {hasSizes && product.sizes ? (
            <div>
              <span className="text-[10px] font-semibold text-gray-500 uppercase block tracking-wider leading-tight">
                A partir de
              </span>
              <p
                className="text-base sm:text-lg font-serif font-black text-gray-950"
                style={{ color: settings.priceColor || '#1A202C' }}
              >
                {currencySymbol}
                {Math.min(...product.sizes.map((s) => s.price)).toFixed(2)}
              </p>
            </div>
          ) : product.isCustomCake || product.priceType === 'consult' ? (
            <span className="text-xs uppercase font-serif font-black tracking-wider px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-950 border border-amber-500/20">
              {settings.language === 'en' ? 'On Request' : 'A Consultar'}
            </span>
          ) : (
            <div>
              {product.oldPrice && product.oldPrice > 0 && (
                <span className="text-xs line-through text-gray-400 block leading-none">
                  {currencySymbol}
                  {product.oldPrice.toFixed(2)}
                </span>
              )}
              <p
                className="text-base sm:text-lg font-serif font-black text-gray-950"
                style={{ color: settings.priceColor || '#1A202C' }}
              >
                {currencySymbol}
                {(product.price && product.price > 0 ? product.price : (product.oldPrice || 0)).toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Área do Botão do Carrinho */}
        <div className="cart-button-area">
          {!requiresCustomization && totalQty > 0 ? (
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const item = cart.find((i) => i.productId === product.id);
                  if (item) onRemoveFromCart(item.id);
                }}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-800 transition-colors active:scale-90 cursor-pointer"
                aria-label="Diminuir quantidade"
              >
                <Minus size={12} />
              </button>
              <span className="text-xs font-black min-w-[16px] text-center text-gray-900">
                {totalQty}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product, 1);
                }}
                className="w-7 h-7 rounded-full text-white flex items-center justify-center transition-colors shadow-sm active:scale-90 cursor-pointer"
                style={{ backgroundColor: settings.primaryColor || '#5C3D2E' }}
                aria-label="Aumentar quantidade"
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(product);
              }}
              className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all text-white cursor-pointer"
              style={{
                backgroundColor: settings.primaryColor || '#5C3D2E',
                color: getContrastText(settings.primaryColor || '#5C3D2E'),
              }}
            >
              <span>
                {requiresCustomization
                  ? 'Quero esse'
                  : totalQty > 0
                  ? `${totalQty} no pedido`
                  : 'Adicionar'}
              </span>
              <ArrowRight size={13} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
