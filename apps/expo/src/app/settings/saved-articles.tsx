/**
 * Saved Articles screen — settings sub-page
 *
 * MOCK DATA / TODO:
 * - TODO: Replace MOCK_SAVED with real data from tRPC (e.g. trpc.content.saved.list)
 * - TODO: Persist unsave action via tRPC mutation (trpc.content.saved.remove)
 * - TODO: Navigate to article detail on card tap (router.push with content id)
 * - TODO: Implement sort/filter controls (by date, by type)
 * - TODO: Paginate / infinite scroll once real data is wired
 */

import { useCallback, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

import { Text, View } from "~/components/Themed";
import { colors, fonts, sp, rd, useTheme } from "~/styles";

interface SavedItem {
  id: string;
  type: "bill" | "order" | "case" | "news";
  title: string;
  date: string;
  color: string;
}

// TODO: Replace with real data from tRPC
const MOCK_SAVED: SavedItem[] = [
  {
    id: "1",
    type: "bill",
    title: "Infrastructure Investment and Jobs Act — Title IX Amendments",
    date: "Feb 14, 2026",
    color: colors.civicBlue,
  },
  {
    id: "2",
    type: "order",
    title: "Executive Order on AI Safety and National Security Standards",
    date: "Feb 12, 2026",
    color: colors.deepIndigo,
  },
  {
    id: "3",
    type: "case",
    title: "Gonzalez v. Department of Labor — Circuit Court Ruling",
    date: "Feb 10, 2026",
    color: colors.teal,
  },
  {
    id: "4",
    type: "bill",
    title: "Clean Energy Transition Act of 2026",
    date: "Feb 8, 2026",
    color: colors.civicBlue,
  },
];

const TYPE_LABELS: Record<string, string> = {
  bill: "BILL",
  order: "ORDER",
  case: "CASE",
  news: "NEWS",
};

const TYPE_ICONS: Record<string, React.ComponentProps<typeof Ionicons>["name"]> = {
  bill: "document-text-outline",
  order: "briefcase-outline",
  case: "scale-outline",
  news: "newspaper-outline",
};

function SwipeableCard({
  item,
  onUnsave,
}: {
  item: SavedItem;
  onUnsave: (id: string) => void;
}) {
  const { theme } = useTheme();
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0.8],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => {
          swipeableRef.current?.close();
          onUnsave(item.id);
        }}
        activeOpacity={0.85}
      >
        <Animated.View style={[styles.deleteActionInner, { transform: [{ scale }] }]}>
          <Ionicons name="bookmark-outline" size={20} color={colors.white} />
          <Text style={styles.deleteActionText}>Unsave</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={40}
      overshootRight={false}
    >
      {/* TODO: Tap to navigate to article detail */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
        activeOpacity={0.75}
      >
        <View style={styles.cardTop} lightColor="transparent" darkColor="transparent">
          <View style={styles.cardTopLeft} lightColor="transparent" darkColor="transparent">
            <Ionicons
              name={TYPE_ICONS[item.type] ?? "document-outline"}
              size={14}
              color={item.color}
            />
            <View
              style={[styles.typeBadge, { backgroundColor: item.color + "22" }]}
              lightColor="transparent"
              darkColor="transparent"
            >
              <Text style={[styles.typeBadgeText, { color: item.color }]}>
                {TYPE_LABELS[item.type] ?? item.type.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={[styles.date, { color: theme.mutedForeground }]}>{item.date}</Text>
        </View>

        <Text style={[styles.cardTitle, { color: theme.foreground }]} numberOfLines={3}>
          {item.title}
        </Text>

        <View style={styles.swipeHint} lightColor="transparent" darkColor="transparent">
          <Ionicons name="chevron-back" size={11} color={theme.mutedForeground} />
          <Text style={[styles.swipeHintText, { color: theme.mutedForeground }]}>
            Swipe to unsave
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default function SavedArticlesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  // TODO: Replace with real data from tRPC query
  const [items, setItems] = useState<SavedItem[]>(MOCK_SAVED);

  // TODO: Call tRPC mutation to persist removal
  const handleUnsave = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      <View
        style={[styles.header, { borderBottomColor: theme.border, backgroundColor: theme.background }]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.foreground }]}>Saved Articles</Text>
        <View style={{ width: 44 }} lightColor="transparent" darkColor="transparent" />
      </View>

      {items.length === 0 ? (
        <View style={styles.empty} lightColor="transparent" darkColor="transparent">
          <Ionicons name="bookmark-outline" size={48} color={theme.mutedForeground} />
          <Text style={[styles.emptyTitle, { color: theme.textSecondary }]}>Nothing saved yet</Text>
          <Text style={[styles.emptyHint, { color: theme.mutedForeground }]}>
            Bookmark articles from the feed to read them later.
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={[styles.count, { color: theme.textSecondary }]}>
            {items.length} saved
          </Text>
          {items.map((item) => (
            <SwipeableCard key={item.id} item={item} onUnsave={handleUnsave} />
          ))}
          <View style={{ height: sp[10] }} lightColor="transparent" darkColor="transparent" />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sp[4],
    paddingVertical: sp[4],
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: fonts.bodySemibold,
    fontSize: 16,
  },
  scroll: { flex: 1, paddingHorizontal: sp[4] },
  count: {
    fontFamily: fonts.body,
    fontSize: 13,
    marginTop: sp[5],
    marginBottom: sp[3],
    marginHorizontal: sp[1],
  },
  card: {
    borderRadius: rd.lg,
    borderWidth: 1,
    padding: sp[4],
    marginBottom: sp[3],
    gap: sp[2],
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTopLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: sp[2],
  },
  typeBadge: {
    paddingHorizontal: sp[2],
    paddingVertical: 2,
    borderRadius: rd.sm,
  },
  typeBadgeText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  date: {
    fontFamily: fonts.body,
    fontSize: 12,
  },
  cardTitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  swipeHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginTop: sp[1],
  },
  swipeHintText: {
    fontFamily: fonts.body,
    fontSize: 11,
  },
  // Swipe-to-unsave action revealed on the right
  deleteAction: {
    backgroundColor: "#C0392B",
    justifyContent: "center",
    alignItems: "center",
    width: 88,
    marginBottom: sp[3],
    borderRadius: rd.lg,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  deleteActionInner: {
    alignItems: "center",
    gap: sp[1],
  },
  deleteActionText: {
    color: colors.white,
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: sp[3],
    paddingHorizontal: sp[10],
  },
  emptyTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: 16,
  },
  emptyHint: {
    fontFamily: fonts.body,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});
